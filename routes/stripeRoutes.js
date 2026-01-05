function registerStripeRoutes(app, { authModule, dbModule, billingModule }) {
  /**
   * Generate a customer billing setup session so users can add payment methods.
   */
  app.get('/getStripeSetupURL', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const setupURL = await billingModule.createSetupSession(userID);
    res.send(setupURL);
  });

  /**
   * Return available and pending Stripe balances for the authenticated coach.
   */
  app.get('/getStripeBalance', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const balance = await billingModule.getBalance(userID);
    res.send({ available: balance.available[0].amount / 100, pending: balance.pending[0].amount / 100 });
  });

  /**
   * Retrieve a Stripe express dashboard login link for coaches.
   */
  app.get('/getStripeLoginURL', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const setupURL = await billingModule.generateLoginLink(userID);
    res.send(setupURL);
  });

  /**
   * Create a Stripe customer portal link for clients managing subscriptions.
   */
  app.get('/getStripePortalURL', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const portalURL = await billingModule.createPortalSession(userID);
    res.send(portalURL);
  });

  /**
   * Webhook: mark a coach's account as payout-ready and create Stripe products/prices for their plans.
   */
  app.post('/whCapability', async function(req, res) {
    const accountID = req.body.account;
    if (req.body.data.object.status == 'active' && req.body.data.previous_attributes.status == 'inactive') {
      const bankingRow = await dbModule.dbGet('SELECT * FROM BANKING WHERE STRIPEID LIKE ?;', [accountID]);
      const userRow = await dbModule.dbGet('SELECT * FROM USER WHERE ID = ?;', [bankingRow.USERID]);

      const newProduct = await billingModule.createProduct('Bastion Coaching With ' + userRow.NAME, 'Your monthly coaching plan.');

      await dbModule.dbRun('INSERT INTO COACH_PRODUCT (COACHID, PRODUCTID) VALUES (?, ?);', [bankingRow.USERID, newProduct.id]);

      const pricingObjects = await dbModule.dbAll('SELECT * FROM PRICINGS WHERE COACHID = ?;', [userRow.ID]);

      for (const pricingObject of pricingObjects) {
        const price = await billingModule.createPrice(pricingObject.PRICE * 100, newProduct.id);
        await dbModule.dbRun('INSERT INTO PRICINGS_STRIPE (PRICINGID, STRIPEPRODUCTID, STRIPEPRICEID) VALUES (?, ?, ?);', [pricingObject.ID, newProduct.id, price.id]);
      }
      res.send('success');
      return;
    }
    res.sendStatus(200);
  });

  /**
   * Webhook: deactivate plans and unlink coach relationships when subscriptions end.
   */
  app.post('/whSubscriptionEnded', async function(req, res) {
    const endedSubscriptionID = req.body.data.object.id;
    const planRow = await dbModule.dbGet('SELECT * FROM PLAN WHERE STRIPESUBSCRIPTIONID = ?;', [endedSubscriptionID]);

    if (!planRow) {
      res.sendStatus(200);
      return;
    }

    let resultString = '';
    resultString += new Date().toDateString();
    resultString = resultString.split(' ');
    resultString = resultString[1] + ' ' + resultString[2] + ', ' + resultString[3];

    await dbModule.dbRun('UPDATE PLAN SET ACTIVE = 0, ENDDATE = ? WHERE ID = ?;', [resultString, planRow.ID]);
    await dbModule.dbRun('UPDATE USER SET COACHID = -1 WHERE ID = ?;', [planRow.CLIENTID]);

    res.sendStatus(200);
  });
}

module.exports = registerStripeRoutes;
