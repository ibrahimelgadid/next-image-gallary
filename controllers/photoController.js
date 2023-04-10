const albumModel = require("../models/albumModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utilis/cloudinary");

exports.getAllPhotos = async (req, res, next) => {
  const photos = await albumModel
    .findOne({ _id: req.params.id })
    .sort({ createdAt: -1 });
  res.status(200).json(photos);
};

exports.addPhotos = asyncHandler(async (req, res) => {
  const errors = {};
  const photos = [];

  if (!req.files || !req.files.length) {
    errors.gallery = "gallery is required";
    return res.status(400).json(errors);
  }

  await Promise.all(
    req.files.map(async (file) => {
      const photo = await cloudinary.uploader.upload(file.path, {
        folder: `gallery/${req.params.id}`,
      });
      photos.push({ id: photo.public_id, img: photo.secure_url });
    })
  );

  const update = await albumModel.updateOne(
    { _id: req.params.id },
    {
      $push: { photos: { $each: photos } },
    }
  );
  if (update.acknowledged) {
    res.status(200).json(update);
  }
});
