function registerMessageRoutes(app, { authModule, dbModule }) {
  /**
   * Return the latest message per conversation for the authenticated user, including sender metadata.
   */
  app.get('/getMessageHeaders', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const responseArray = [];
    const rows = await dbModule.dbAll('SELECT DISTINCT FROMID, MESSAGE FROM MESSAGES WHERE TOID = ? ORDER BY ID DESC;', [userID]);
    for (const row of rows) {
      const senderProfile = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?;', [row.FROMID]);
      if (!senderProfile) {
        res.sendStatus(400);
        return;
      }
      const responseObject = {
        name: senderProfile.NAME,
        profilePicture: senderProfile.PROFILEPICTURE,
        message: row.MESSAGE,
        fromID: row.FROMID
      };
      responseArray.push(responseObject);
    }
    res.send(responseArray);
  });

  /**
   * Get the complete message history between the authenticated user and another user.
   */
  app.get('/getMessages/:chatID', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    const result = await dbModule.dbAll('SELECT * FROM MESSAGES WHERE (FROMID = ? AND TOID = ?) OR (FROMID = ? AND TOID = ?);', [userID, req.params.chatID, req.params.chatID, userID]);
    res.send(result);
  });

  /**
   * Lookup the name and avatar for a chat participant.
   */
  app.get('/getChatInfo/:userID', async function(req, res) {
    const result = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?;', [req.params.userID]);
    res.send(result);
  });

  /**
   * Persist a new chat message from the authenticated user to a recipient.
   */
  app.post('/sendMessage', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }
    dbModule.dbRun('INSERT INTO MESSAGES (FROMID, TOID, MESSAGE) VALUES (?, ?, ?);', [userID, req.body.toID, req.body.message]);
    res.sendStatus(200);
  });
}

module.exports = registerMessageRoutes;
