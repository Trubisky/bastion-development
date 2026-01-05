function registerCoachRoutes(app, { authModule, dbModule, billingModule }) {
  /**
   * Capture coach onboarding data, create pricing tiers, and start Stripe connect onboarding.
   */
  app.post('/coachJoin', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }

    const existingProfile = await dbModule.dbAll("SELECT * FROM USER WHERE ID = ? AND (LOCATION IS NOT NULL AND LOCATION != '');", [userID]);
    if (existingProfile.length > 0) {
      res.sendStatus(409);
      return;
    }

    dbModule.dbRun('UPDATE USER SET NAME = ?, LOCATION = ?, GENDER = ?, ABOUT = ? WHERE ID = ?;', [req.body.firstName + ' ' + req.body.lastName, req.body.location, req.body.gender, req.body.about, userID]);

    for (const language of req.body.languages) {
      dbModule.dbRun('INSERT INTO COACHLANGUAGES (COACHID, LANGUAGE, FLUENCY) VALUES (?, ?, ?);', [userID, language.language, language.proficiency]);
    }
    dbModule.dbRun('INSERT INTO COACHATTRIBUTES (COACHID, ATTRIBUTE1, ATTRIBUTE2, ATTRIBUTE3) VALUES (?, ?, ?, ?);', [userID, req.body.attributes[0], req.body.attributes[1], req.body.attributes[2]]);
    dbModule.dbRun('INSERT INTO COACHSPEC (COACHID, SPEC1, SPEC2, SPEC3) VALUES (?, ?, ?, ?);', [userID, req.body.specialties[0], req.body.specialties[1], req.body.specialties[2]]);
    dbModule.dbRun('INSERT INTO COACHACCOUNTABLE (COACHID, ACCOUNTABLE) VALUES (?, ?);', [userID, req.body.accountable]);

    if (req.body.compExperience != 'No') {
      for (const comp of req.body.comps) {
        dbModule.dbRun('INSERT INTO COACHCOMP (COACHID, COMP) VALUES (?, ?);', [userID, comp]);
      }
    }
    for (const circumstance of req.body.circumstances) {
      await dbModule.dbRun('INSERT INTO COACHCIRC (COACHID, CIRC) VALUES (?, ?);', [userID, circumstance]);
    }
    for (const pricing of req.body.memberships) {
      await dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);', [userID, pricing.title, pricing.description, pricing.price]);

      const pricingIdRow = await dbModule.dbGet('SELECT ID FROM PRICINGS ORDER BY ID DESC LIMIT 5;', []);
      for (const feature of pricing.features) {
        if (feature === '') {
          continue;
        }
        await dbModule.dbRun('INSERT INTO PRICINGS_FEATURES (PRICINGID, FEATURE) VALUES (?, ?);', [pricingIdRow.ID, feature]);
      }
    }
    for (const certification of req.body.certifications) {
      dbModule.dbRun('INSERT INTO CERTIFICATIONS (COACHID, CERTIFICATION, RESOURCE, COMPLETIONDATE, APPROVED) VALUES (?, ?, ?, ?, ?);', [userID, certification.title, certification.number, certification.date, 0]);
    }
    const accountURL = await billingModule.createConnectedAccount(userID);

    res.send(accountURL);
  });
}

module.exports = registerCoachRoutes;
