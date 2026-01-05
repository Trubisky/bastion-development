function registerPricingRoutes(app, { authModule, dbModule, billingModule }) {
  /**
   * Get all pricing tiers for the authenticated coach, including feature lists.
   */
  app.get('/getPricings', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const result = await dbModule.dbAll('SELECT * FROM PRICINGS WHERE COACHID = ?;', [userID]);
    for (let i = 0; i < result.length; i++) {
      result[i].FEATURES = await dbModule.dbAll('SELECT FEATURE FROM PRICINGS_FEATURES WHERE PRICINGID = ?;', [result[i].ID]);
    }
    res.send(result);
  });

  /**
   * Update an existing pricing tier and sync changes to Stripe when possible.
   */
  app.post('/updatePricings', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID || userID != req.body.COACHID) {
      res.sendStatus(401);
      return;
    }
    const previousPricing = await dbModule.dbGet('SELECT * FROM PRICINGS WHERE ID = ?;', [req.body.ID]);
    if (!previousPricing) {
      res.sendStatus(400);
      return;
    }
    if (previousPricing.COACHID != userID) {
      res.sendStatus(403);
      return;
    }
    await dbModule.dbRun('UPDATE PRICINGS SET TITLE = ?, DESCRIPTION = ?, PRICE = ? WHERE ID = ?;', [req.body.TITLE, req.body.DESCRIPTION, req.body.PRICE, req.body.ID]);
    await dbModule.dbRun('DELETE FROM PRICINGS_FEATURES WHERE PRICINGID = ?;', [req.body.ID]);
    for (const feature of req.body.FEATURES) {
      if (feature.FEATURE == '') {
        continue;
      }
      await dbModule.dbRun('INSERT INTO PRICINGS_FEATURES (PRICINGID, FEATURE) VALUES (?, ?);', [req.body.ID, feature.FEATURE]);
    }
    try {
      await billingModule.updateSubscriptionPrice(req.body.ID, req.body.PRICE);
    } catch (err) {}
    res.sendStatus(201);
  });

  /**
   * Create a starter pricing tier and its Stripe price for the requesting coach.
   */
  app.get('/createPricing', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    await dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);', [userID, 'New Membership', 'An editable bastion membership.', 100.0]);
    const pricingRow = await dbModule.dbGet('SELECT ID FROM PRICINGS ORDER BY ID DESC LIMIT 5', []);
    const cpRow = await dbModule.dbGet('SELECT * FROM COACH_PRODUCT WHERE COACHID = ?;', [userID]);

    const price = await billingModule.createPrice(10000, cpRow.PRODUCTID);

    await dbModule.dbRun('INSERT INTO PRICINGS_STRIPE (PRICINGID, STRIPEPRODUCTID, STRIPEPRICEID) VALUES (?, ?, ?);', [pricingRow.ID, cpRow.PRODUCTID, price.id]);

    res.sendStatus(200);
  });
}

module.exports = registerPricingRoutes;
