const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    photos: [{ id: String, img: String }],
    publicId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Album", albumSchema);
