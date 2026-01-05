function registerAuthRoutes(app, { authModule, dbModule, mailModule, billingModule, desc1, desc2 }) {
  /**
   * Create a new account, persist survey answers, seed default pricing (for coaches),
   * and return the authentication token used for future requests.
   */
  app.post('/createAccount', async function(req, res) {
    const token = await authModule.register(req.body.email, req.body.password, req.body.isCoach, req.body.surveyAnswers);
    if (!token) {
      res.sendStatus(409);
      return;
    }

    // Fetch the most recently created user row to associate related records.
    const mostRecentUser = await dbModule.dbGet('SELECT ID, NAME FROM USER ORDER BY ID DESC;', []);
    const userName = mostRecentUser.NAME;
    const userID = mostRecentUser.ID;

    for (const surveyAnswer of req.body.surveyAnswers) {
      dbModule.dbRun(
        'INSERT INTO SURVEY (USERID, PROMPT, QUESTIONTYPE, INPUTANSWER, MULTISELECTANSWER) VALUES (?, ?, ?, ?, ?);',
        [userID, surveyAnswer.prompt, surveyAnswer.type, surveyAnswer.inputAnswer, surveyAnswer.multiselectAnswer]
      );
    }

    if (req.body.isCoach) {
      dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);', [userID, 'Basic Membership', desc1, 100]);
      dbModule.dbRun('INSERT INTO PRICINGS (COACHID, TITLE, DESCRIPTION, PRICE) VALUES (?, ?, ?, ?);', [userID, 'Intermediate Membership', desc2, 130]);
    }

    billingModule.createCustomer(userID);
    mailModule.sendThankYou(userName, req.body.email);
    res.send(token);
  });

  /**
   * Verify credentials and return an auth token on success.
   */
  app.post('/login', async function(req, res) {
    const token = await authModule.login(req.body.email, req.body.password);
    if (token) {
      res.send(token);
      return;
    }
    res.sendStatus(401);
  });

  /**
   * Trigger a password reset email if the account exists. Response is always 200
   * to avoid leaking which emails are registered.
   */
  app.post('/forgotPassword', async function(req, res) {
    const userRow = await dbModule.dbGet('SELECT ID FROM USER WHERE EMAIL LIKE ?;', [req.body.email]);
    if (!userRow) {
      res.sendStatus(200);
      return;
    }
    const resetToken = authModule.generateToken();
    const expiresTime = Math.floor(Date.now() / 1000) + 1800;
    await dbModule.dbRun('INSERT INTO RESETPASSWORD (USERID, RESETTOKEN, EXPIRES) VALUES (?, ?, ?);', [userRow.ID, resetToken, expiresTime]);
    mailModule.sendResetPassword(req.body.email, resetToken);
    res.sendStatus(200);
  });

  /**
   * Validate a reset token, update the stored password, and invalidate the token.
   */
  app.post('/resetPassword', async function(req, res) {
    const resetRow = await dbModule.dbGet('SELECT * FROM RESETPASSWORD WHERE RESETTOKEN LIKE ?;', [req.body.resetToken]);
    if (!resetRow) {
      res.sendStatus(400);
      return;
    }
    if (Math.floor(Date.now() / 1000) > resetRow.EXPIRES) {
      res.sendStatus(400);
      return;
    }
    authModule.resetPassword(resetRow.USERID, req.body.password);
    res.sendStatus(200);
  });

  /**
   * Authenticated path to send the current user a password reset email.
   */
  app.get('/requestPasswordReset', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const userRow = await dbModule.dbGet('SELECT EMAIL FROM USER WHERE ID = ?;', [userID]);

    const resetToken = authModule.generateToken();
    const expiresTime = Math.floor(Date.now() / 1000) + 1800;

    await dbModule.dbRun('INSERT INTO RESETPASSWORD (USERID, RESETTOKEN, EXPIRES) VALUES (?, ?, ?);', [userID, resetToken, expiresTime]);

    mailModule.sendResetPassword(userRow.EMAIL, resetToken);

    res.sendStatus(200);
  });
}

module.exports = registerAuthRoutes;
