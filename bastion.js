const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const https = require('https');
const bcrypt = require('bcrypt');
const jimp = require('jimp');
const authModule = require('/home/modules/auth.js');
const resourceModule = require('/home/modules/resources.js');
const mailModule = require('/home/modules/mail.js');
const requestValidator = require('/home/modules/requestValidator.js');
const dbModule = require('/home/modules/database.js');
const billingModule = require('/home/modules/billing.js');
const fs = require('fs');

const request = require('request');

// Serve public assets from the repo's static directories.
app.use(express.static('static'));
app.use('/landing', express.static('landing'));

// Enable request body parsing for form submissions and JSON payloads.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Initialize the database connection before registering any endpoints.
dbModule.initDB();

const ssl = {
  key: fs.readFileSync('/etc/letsencrypt/live/prod.bastionfit.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/prod.bastionfit.com/fullchain.pem')
};

// Lightweight proxy to the public marketing blog to keep legacy links working.
app.get('/blog*', async function(req, res) {
  const proxiedUrl = 'https://blog.bastionfit.com' + req.originalUrl.substring(5);
  req.pipe(request(proxiedUrl)).pipe(res);
});

// Basic request validation to reject malformed payloads before reaching routes.
app.use((req, res, next) => {
  const requestIsValid = requestValidator.validateRequest(req.originalUrl, req.body);
  if (!requestIsValid) {
    res.sendStatus(400);
    return;
  }
  next();
});

const defaultPricingDescription =
  'Expert 1-on-1 coaching, customized workouts, personalized meal plans, daily access to your own fitness and well coach.';
const defaultPricingDescriptionWithCalls =
  'Expert 1-on-1 coaching, customized workouts, personalized meal plans, daily access to your own fitness and well coach and weekly zoom calls.';

const routeDependencies = {
  authModule,
  resourceModule,
  mailModule,
  dbModule,
  billingModule,
  jimp,
  desc1: defaultPricingDescription,
  desc2: defaultPricingDescriptionWithCalls
};

const routeRegistrars = [
  require('./routes/authRoutes'),
  require('./routes/profileRoutes'),
  require('./routes/pricingRoutes'),
  require('./routes/clientRoutes'),
  require('./routes/messageRoutes'),
  require('./routes/reviewRoutes'),
  require('./routes/adminRoutes'),
  require('./routes/coachRoutes'),
  require('./routes/stripeRoutes')
];

// Each module receives the shared dependencies and attaches its endpoints to the app instance.
routeRegistrars.forEach(register => register(app, routeDependencies));

// Force HTTP traffic to HTTPS for production security.
http.createServer(function(req, res) {
  res.writeHead(302, { Location: 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80);

https.createServer(ssl, app).listen(443);

//http.createServer(app).listen(8010);

