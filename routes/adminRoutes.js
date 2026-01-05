function registerAdminRoutes(app, { authModule, dbModule, mailModule, desc1, desc2 }) {
  /**
   * Return all registered coaches for admin dashboards.
   */
  app.get('/adminGetCoaches', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    const result = await dbModule.dbAll('SELECT NAME, ID, PROFILEPICTURE FROM USER WHERE ISCOACH = 1;', []);
    res.send(result);
  });

  /**
   * Provide coach profile details and certifications for administrative review.
   */
  app.get('/adminViewCoach/:coachid', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    const payload = {};
    payload.profileInfo = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE, ABOUT FROM USER WHERE ID = ?;', [req.params.coachid]);
    payload.certifications = await dbModule.dbAll('SELECT * FROM CERTIFICATIONS WHERE COACHID = ?;', [req.params.coachid]);
    res.send(payload);
  });

  /**
   * List all clients for a given coach, including active/past status.
   */
  app.get('/adminViewCoachClients/:coachid', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    const payload = {};

    const userName = await dbModule.dbGet('SELECT NAME FROM USER WHERE ID = ?;', [req.params.coachid]);
    if (!userName) {
      res.sendStatus(400);
      return;
    }
    payload.NAME = userName.NAME;
    payload.CLIENTS = await dbModule.dbAll('SELECT USER.ID, NAME, PROFILEPICTURE, ACTIVE FROM USER JOIN PLAN ON USER.ID = PLAN.CLIENTID AND PLAN.COACHID = ?;', [req.params.coachid]);
    res.send(payload);
  });

  /**
   * Retrieve all non-coach, non-admin users.
   */
  app.get('/adminGetClients', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    res.send(await dbModule.dbAll('SELECT ID, NAME, PROFILEPICTURE FROM USER WHERE ISCOACH = 0 AND ADMIN IS NULL;', []));
  });

  /**
   * Retrieve clients without an assigned coach.
   */
  app.get('/adminGetOpenClients', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    res.send(await dbModule.dbAll('SELECT ID, NAME, PROFILEPICTURE FROM USER WHERE ISCOACH = 0 AND ADMIN IS NULL AND (COACHID IS NULL OR COACHID = -1);', []));
  });

  /**
   * Assign one or more coaches to a client (used for intake triage).
   */
  app.post('/adminAssignCoaches', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    for (const coachID of req.body.coaches) {
      await dbModule.dbRun('INSERT INTO ASSIGNCOACHES (COACHID, CLIENTID) VALUES (?, ?);', [coachID, req.body.clientID]);
    }
    res.sendStatus(200);
  });

  /**
   * End an active subscription by unlinking the coach/client association and deactivating the plan.
   */
  app.post('/adminCancelSubscription', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    const clientID = req.body.clientID;
    const userRow = await dbModule.dbGet('SELECT COACHID FROM USER WHERE ID = ?', [clientID]);
    dbModule.dbRun('UPDATE USER SET COACHID = -1 WHERE ID = ?;', [clientID]);
    dbModule.dbRun('UPDATE PLAN SET ACTIVE = 0 WHERE CLIENTID = ? AND COACHID = ?;', [clientID, userRow.COACHID]);
    res.sendStatus(200);
  });

  /**
   * Create a coach account on behalf of an invitee and email their temporary credentials.
   */
  app.post('/adminInviteCoach', async function(req, res) {
    const adminId = await authModule.resolveAdminId(req.headers.token);
    if (!adminId) {
      res.sendStatus(401);
      return;
    }
    const token = await authModule.register(req.body.email, req.body.password, 1, [{ inputAnswer: req.body.name }]);
    if (!token) {
      res.sendStatus(409);
      return;
    }

    mailModule.inviteCoach(req.body.name, req.body.password, req.body.email, token);
    res.sendStatus(200);
  });
}

module.exports = registerAdminRoutes;
