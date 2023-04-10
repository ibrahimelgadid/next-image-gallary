const express = require("express");
const { getAllPhotos, addPhotos } = require("../controllers/photoController");
const { upload } = require("../utilis/multerPhotos");
const router = express.Router({});

router
  .route("/id/:id")
  .get(getAllPhotos)
  .post(
    upload.array("photos"),
    (err, req, res, next) => {
      const errors = {};
      if (err) {
        errors.photos = err.message;
        res.status(400).send(errors);
      }
    },

    addPhotos
  );

module.exports = router;
