const express = require("express");
const {
  getAllAbums,
  addAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const { upload } = require("../utilis/multer");
const router = express.Router({});

router
  .route("/")
  .get(getAllAbums)
  .post(
    upload.single("thumbnail"),
    (err, req, res, next) => {
      const errors = {};
      if (err) {
        errors.thumbnail = err.message;
        res.status(400).send(errors);
      }
    },
    addAlbum
  );

router.route("/id/:id").delete(deleteAlbum);

module.exports = router;
