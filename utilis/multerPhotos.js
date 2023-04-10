const multer = require("multer");

exports.upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed."));
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
