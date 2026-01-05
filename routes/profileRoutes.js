function registerProfileRoutes(app, { authModule, dbModule, resourceModule, jimp }) {
  /**
   * Crop and resize a base64 profile picture, upload it to storage, and persist the new URL.
   */
  app.post('/updateProfilePicture', async function(req, res) {
    let pictureBase64 = req.body.picture.split(';base64,').pop();

    jimp.read(Buffer.from(pictureBase64, 'base64')).then(image => {
      const options = req.body.options;
      image.crop(options.x, options.y, options.width, options.height);
      image.resize(512, 512);
      image.getBase64Async(jimp.MIME_PNG).then(async final => {
        pictureBase64 = final.split(';base64,').pop();
        const filePath = await resourceModule.uploadProfilePicture(pictureBase64);
        dbModule.dbRun('UPDATE USER SET PROFILEPICTURE = ? WHERE TOKEN LIKE ?;', [filePath, req.headers.token]);
        res.send(filePath);
      });
    });
  });

  /**
   * Update the short biography/about section for the current authenticated user.
   */
  app.post('/updateAbout', async function(req, res) {
    const about = req.body.about;
    const resultCode = await dbModule.dbRun('UPDATE USER SET ABOUT = ? WHERE TOKEN LIKE ?;', [about, req.headers.token]);
    if (!resultCode) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(201);
  });

  /**
   * Retrieve the profile metadata for the authenticated user, used by dashboards.
   */
  app.get('/getProfileInfo', async function(req, res) {
    const result = await dbModule.dbGet(
      'SELECT ID, NAME, ADMIN, PROFILEPICTURE, LOCATION, ISCOACH, COACHID, ABOUT FROM USER WHERE TOKEN LIKE ?;',
      [req.headers.token]
    );
    if (!result) {
      res.sendStatus(401);
      return;
    }
    res.send(result);
  });
}

module.exports = registerProfileRoutes;
