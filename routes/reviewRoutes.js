function registerReviewRoutes(app, { authModule, dbModule, resourceModule }) {
  /**
   * Persist a client review (with optional before/after photos) against their active coach.
   */
  app.post('/leaveReview', async function(req, res) {
    const userID = await authModule.resolveUserId(req.headers.token);
    if (!userID) {
      res.sendStatus(401);
      return;
    }

    let beforeImage = req.body.before;
    if (beforeImage) {
      beforeImage = beforeImage.split(';base64,').pop();
      beforeImage = await resourceModule.uploadPicture(beforeImage);
    }
    let afterImage = req.body.after;
    if (afterImage) {
      afterImage = afterImage.split(';base64,').pop();
      afterImage = await resourceModule.uploadPicture(afterImage);
    }

    const userRow = await dbModule.dbGet('SELECT COACHID FROM USER WHERE ID = ?;', [userID]);

    await dbModule.dbRun('INSERT INTO REVIEWS (COACHID, CLIENTID, REVIEW, BEFORERESOURCE, AFTERRESOURCE) VALUES (?, ?, ?, ?, ?);', [userRow.COACHID, userID, req.body.review, beforeImage, afterImage]);
    res.sendStatus(200);
  });

  /**
   * Fetch all reviews for a coach and enrich with reviewer name and avatar.
   */
  app.get('/getReviews/:coachid', async function(req, res) {
    const reviews = await dbModule.dbAll('SELECT * FROM REVIEWS WHERE COACHID = ?;', [req.params.coachid]);
    for (let i = 0; i < reviews.length; i++) {
      const userRow = await dbModule.dbGet('SELECT NAME, PROFILEPICTURE FROM USER WHERE ID = ?;', [reviews[i].CLIENTID]);
      reviews[i].reviewInfo = userRow;
    }
    res.send(reviews);
  });
}

module.exports = registerReviewRoutes;
