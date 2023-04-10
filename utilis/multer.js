const multer = require("multer");

const storage = multer.diskStorage({});
exports.upload = multer({
  storage: storage,
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
