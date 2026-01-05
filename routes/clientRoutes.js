function registerClientRoutes(app, { authModule, dbModule, mailModule, billingModule }) {
  /**
   * List coach-assigned clients who are currently unpaired with any coach and have no open offers from this coach.
   */
  app.get('/getOpenClients', async function(req, res) {
    const coachId = await authModule.resolveUserId(req.headers.token);
    if (!coachId) {
      res.sendStatus(401);
      return;
    }
    const unassignedClients = await dbModule.dbAll(
      'SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE (COACHID IS NULL OR COACHID = -1) AND ISCOACH != 1;',
      []
    );
    const activeOffers = await dbModule.dbAll('SELECT CLIENTID FROM OFFERS WHERE COACHID = ?;', [coachId]);
    const clientsWithOpenOffers = activeOffers.map(offer => offer.CLIENTID);

    const filteredCandidates = [];
    for (const candidate of unassignedClients) {
      if (clientsWithOpenOffers.includes(candidate.ID)) {
        continue;
      }
      filteredCandidates.push(candidate);
    }

    const assignedClients = await dbModule.dbAll('SELECT * FROM ASSIGNCOACHES WHERE COACHID = ?;', [coachId]);
    const allowedClientIds = assignedClients.map(assignment => assignment.CLIENTID);
    const eligibleClients = filteredCandidates.filter(client => allowedClientIds.includes(client.ID));

    res.send(eligibleClients);
  });

  /**
   * Retrieve all active clients for the requesting coach, annotating active plan IDs for UI linking.
   */
  app.get('/getMyClients', async function(req, res) {
    const coachId = await authModule.resolveUserId(req.headers.token);
    if (!coachId) {
      res.sendStatus(401);
      return;
    }
    const clients = await dbModule.dbAll('SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE COACHID = ? AND ISCOACH != 1;', [coachId]);
    if (!clients) {
      res.sendStatus(400);
      return;
    }
    for (const client of clients) {
      const planRow = await dbModule.dbGet('SELECT ID FROM PLAN WHERE CLIENTID = ? AND COACHID = ? AND ACTIVE = 1;', [client.ID, coachId]);
      if (!planRow) {
        continue;
      }
      client.PLANID = planRow.ID;
    }
    res.send(clients);
  });

  /**
   * Replace the requesting coach's certifications with the provided list, marking new entries as pending approval.
   */
  app.post('/updateCertifications', async function(req, res) {
    const coachId = await authModule.resolveUserId(req.headers.token);
    if (!coachId) {
      res.sendStatus(401);
      return;
    }
    const coachRow = await dbModule.dbGet('SELECT ISCOACH FROM USER WHERE ID = ?', [coachId]);
    if (!coachRow.ISCOACH) {
      res.sendStatus(403);
      return;
    }

    dbModule.dbRun('DELETE FROM CERTIFICATIONS WHERE COACHID = ?;', [coachId]);
    for (const certification of req.body.certifications) {
      dbModule.dbRun(
        'INSERT INTO CERTIFICATIONS (COACHID, CERTIFICATION, RESOURCE, APPROVED, COMPLETIONDATE) VALUES (?, ?, ?, ?, ?);',
        [coachId, certification.CERTIFICATION, certification.RESOURCE, 0, certification.COMPLETIONDATE]
      );
    }
    res.sendStatus(200);
  });

  /**
   * Retrieve all certification records for the authenticated coach.
   */
  app.get('/getCertifications', async function(req, res) {
    const coachId = await authModule.resolveUserId(req.headers.token);
    if (!coachId) {
      res.sendStatus(401);
      return;
    }
    const result = await dbModule.dbAll('SELECT * FROM CERTIFICATIONS WHERE COACHID = ?;', [coachId]);
    res.send(result);
  });

  /**
   * Preview a client's profile and survey responses for coaches evaluating them.
   */
  app.get('/clientPreview/:clientID', async function(req, res) {
    if (isNaN(req.params.clientID)) {
      res.sendStatus(400);
      return;
    }
    const preview = {};
    preview.surveyAnswers = await dbModule.dbAll('SELECT * FROM SURVEY WHERE USERID = ?;', [req.params.clientID]);

    const clientRecord = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, COACHID FROM USER WHERE ID = ?;', [req.params.clientID]);
    if (!clientRecord) {
      res.sendStatus(400);
      return;
    }
    preview.name = clientRecord.NAME;
    preview.ProfilePicture = clientRecord.PROFILEPICTURE;
    preview.CoachID = clientRecord.COACHID;
    res.send(preview);
  });

  /**
   * Return all pricing plans for the logged-in coach to use when sending offers.
   */
  app.get('/offerPricings', async function(req, res) {
    const coachId = await authModule.resolveUserId(req.headers.token);
    if (!coachId) {
      res.sendStatus(401);
      return;
    }

    const result = await dbModule.dbAll('SELECT ID, TITLE, PRICE FROM PRICINGS WHERE COACHID = ?;', [coachId]);
    res.send(result);
  });

  /**
   * Send a coaching offer to a client, including a greeting message and pricing reference.
   */
  app.post('/sendOffer', async function(req, res) {
    const coachId = await authModule.resolveUserId(req.headers.token);
    if (!coachId) {
      res.sendStatus(401);
      return;
    }
    const coachRow = await dbModule.dbGet('SELECT ISCOACH FROM USER WHERE ID = ?', [coachId]);
    if (!coachRow.ISCOACH) {
      res.sendStatus(403);
      return;
    }

    const accountIsActive = await billingModule.checkActive(coachId);
    if (!accountIsActive) {
      const onboardingLink = await billingModule.generateOnboardingLink(coachId);
      res.status(307).send(onboardingLink);
      return;
    }
    const clientRecord = await dbModule.dbGet('SELECT NAME, EMAIL FROM USER WHERE ID = ?;', [req.body.clientID]);
    mailModule.sendOfferEmail(clientRecord.NAME, clientRecord.EMAIL);

    dbModule.dbRun('INSERT INTO OFFERS (CLIENTID, COACHID, PRICINGID) VALUES (?, ?, ?);', [req.body.clientID, coachId, req.body.planID]);
    dbModule.dbRun('INSERT INTO MESSAGES (FROMID, TOID, MESSAGE) VALUES (?, ?, ?);', [coachId, req.body.clientID, req.body.greeting]);
    res.sendStatus(200);
  });

  /**
   * Fetch raw offer rows for the authenticated client.
   */
  app.get('/getOffers', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const result = await dbModule.dbAll('SELECT * FROM OFFERS WHERE CLIENTID LIKE ?;', [userID]);
    res.send(result);
  });

  /**
   * Assemble enriched offer cards (coach info + pricing info) for client dashboards.
   */
  app.get('/getOffersDisplay', async function(req, res) {
    const responseObject = [];
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const rows = await dbModule.dbAll('SELECT * FROM OFFERS WHERE CLIENTID LIKE ?;', [userID]);
    for (const row of rows) {
      const payload = { ID: row.ID };
      const coachInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?', [row.COACHID]);
      if (!coachInfo) {
        res.sendStatus(500);
        return;
      }
      payload.name = coachInfo.NAME;
      payload.profilePicture = coachInfo.PROFILEPICTURE;

      const pricingInfo = await dbModule.dbGet('SELECT TITLE, PRICE FROM PRICINGS WHERE ID = ?', [row.PRICINGID]);
      if (!pricingInfo) {
        res.sendStatus(500);
        return;
      }
      payload.title = pricingInfo.TITLE;
      payload.price = pricingInfo.PRICE;

      responseObject.push(payload);
    }
    res.send(responseObject);
  });

  /**
   * Retrieve full offer details, including coach profile, pricing features, and certifications.
   */
  app.get('/getOffer/:offerid', async function(req, res) {
    const offer = await dbModule.dbGet('SELECT * FROM OFFERS WHERE ID = ?;', [req.params.offerid]);
    if (!offer) {
      res.sendStatus(400);
      return;
    }
    const payload = {};
    payload.profileInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, LOCATION, ABOUT FROM USER WHERE ID = ?;', [offer.COACHID]);
    payload.profileInfo.ATTRIBUTES = await dbModule.dbGet('SELECT * FROM COACHATTRIBUTES WHERE COACHID = ?;', [offer.COACHID]);
    payload.profileInfo.EXPERTISE = await new Promise(async function(resolve) {
      const resultArray = [];
      const comps = await dbModule.dbAll('SELECT COMP FROM COACHCOMP WHERE COACHID = ?;', [offer.COACHID]);
      const circs = await dbModule.dbAll('SELECT CIRC FROM COACHCIRC WHERE COACHID = ?;', [offer.COACHID]);
      for (const obj of comps) {
        resultArray.push(obj.COMP);
      }
      for (const obj of circs) {
        resultArray.push(obj.CIRC);
      }
      resolve(resultArray);
    });
    payload.profileInfo.LANGUAGES = await dbModule.dbAll('SELECT * FROM COACHLANGUAGES WHERE COACHID = ?;', [offer.COACHID]);

    payload.pricingInfo = await dbModule.dbGet('SELECT * FROM PRICINGS WHERE ID = ?;', [offer.PRICINGID]);
    payload.pricingInfo.FEATURES = await dbModule.dbAll('SELECT * FROM PRICINGS_FEATURES WHERE PRICINGID = ?;', [offer.PRICINGID]);
    payload.certifications = await dbModule.dbAll('SELECT CERTIFICATION FROM CERTIFICATIONS WHERE COACHID = ?', [offer.COACHID]);
    res.send(payload);
  });

  /**
   * Provide the public-facing coach profile card with expertise, attributes, and certifications.
   */
  app.get('/getCoachDisplay/:coachid', async function(req, res) {
    const payload = {};
    payload.profileInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, LOCATION, ABOUT FROM USER WHERE ID = ?;', [req.params.coachid]);
    payload.profileInfo.ATTRIBUTES = await dbModule.dbGet('SELECT * FROM COACHATTRIBUTES WHERE COACHID = ?;', [req.params.coachid]);
    payload.profileInfo.EXPERTISE = await new Promise(async function(resolve) {
      const resultArray = [];
      const comps = await dbModule.dbAll('SELECT COMP FROM COACHCOMP WHERE COACHID = ?;', [req.params.coachid]);
      const circs = await dbModule.dbAll('SELECT CIRC FROM COACHCIRC WHERE COACHID = ?;', [req.params.coachid]);
      for (const obj of comps) {
        resultArray.push(obj.COMP);
      }
      for (const obj of circs) {
        resultArray.push(obj.CIRC);
      }
      resolve(resultArray);
    });
    payload.profileInfo.LANGUAGES = await dbModule.dbAll('SELECT * FROM COACHLANGUAGES WHERE COACHID = ?;', [req.params.coachid]);

    payload.certifications = await dbModule.dbAll('SELECT CERTIFICATION FROM CERTIFICATIONS WHERE COACHID = ?;', [req.params.coachid]);
    res.send(payload);
  });

  /**
   * Accept an offer, ensure payment readiness, and create an active plan + Stripe subscription.
   */
  app.post('/startCoaching', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const hasPaymentMethod = await billingModule.checkPaymentMethod(userID);
    if (!hasPaymentMethod) {
      const setupURL = await billingModule.createSetupSession(userID, 'https://bastionfit.com/#/offers');
      res.status(307).send(setupURL);
      return;
    }

    const offerEntry = await dbModule.dbGet('SELECT * FROM OFFERS WHERE ID = ?;', [req.body.offerID]);
    if (!offerEntry) {
      res.sendStatus(400);
      return;
    }
    if (offerEntry.CLIENTID != userID) {
      res.sendStatus(401);
      return;
    }

    let formattedDate = '';
    formattedDate += new Date().toDateString();
    formattedDate = formattedDate.split(' ');
    formattedDate = formattedDate[1] + ' ' + formattedDate[2] + ', ' + formattedDate[3];

    const pricingID = (await dbModule.dbGet('SELECT PRICINGID FROM OFFERS WHERE ID = ?;', [req.body.offerID])).PRICINGID;
    const pricingInfo = await dbModule.dbGet('SELECT * FROM PRICINGS WHERE ID = ?;', [pricingID]);
    if (!pricingInfo) {
      res.sendStatus(500);
      return;
    }
    const subscriptionID = await billingModule.createSubscription(userID, pricingID);

    dbModule.dbRun(
      'INSERT INTO PLAN (CLIENTID, COACHID, PRICINGID, STARTDATE, ENDDATE, ACTIVE, STRIPESUBSCRIPTIONID) VALUES (?, ?, ?, ?, ?, ?, ?);',
      [userID, pricingInfo.COACHID, pricingID, formattedDate, '', 1, subscriptionID]
    );
    dbModule.dbRun('UPDATE USER SET COACHID = ? WHERE ID = ?;', [pricingInfo.COACHID, userID]);
    res.sendStatus(200);
  });

  /**
   * Generate a short name string for UI display (e.g., "Alex R.").
   */
  app.get('/getCoachNameString/:coachid', async function(req, res) {
    const dbResult = await dbModule.dbGet('SELECT NAME FROM USER WHERE ID = ?;', [req.params.coachid]);
    if (!dbResult) {
      res.sendStatus(400);
      return;
    }
    let name = dbResult.NAME;
    name = name.split(' ');

    if (name.length === 0) {
      res.sendStatus(500);
      return;
    }

    if (name.length > 1) {
      res.send(name[0] + ' ' + name[name.length - 1][0] + '.');
    } else {
      res.send(name[0]);
    }
  });

  /**
   * Provide plan, client, and pricing metadata for an active engagement.
   */
  app.get('/viewActiveClient/:planid', async function(req, res) {
    const payload = {};
    const planInfo = await dbModule.dbGet('SELECT * FROM PLAN WHERE ID = ?;', [req.params.planid]);
    if (!planInfo) {
      res.sendStatus(400);
      return;
    }
    payload.clientInfo = await dbModule.dbGet('SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE ID = ?;', [planInfo.CLIENTID]);
    payload.pricingInfo = await dbModule.dbGet('SELECT TITLE, DESCRIPTION, PRICE FROM PRICINGS WHERE ID = ?', [planInfo.PRICINGID]);
    payload.startDate = planInfo.STARTDATE;
    res.send(payload);
  });
}

module.exports = registerClientRoutes;
