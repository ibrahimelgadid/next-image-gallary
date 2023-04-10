const albumModel = require("../models/albumModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utilis/cloudinary");

//////////////////////////////////////////
////////// !Get albums ///////////////////
//////////////////////////////////////////
exports.getAllAbums = asyncHandler(async (req, res, next) => {
  const abums = await albumModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(abums);
});

//////////////////////////////////////////
////////// !Add album ////////////////////
//////////////////////////////////////////
exports.addAlbum = asyncHandler(async (req, res, next) => {
  const errors = {};
  if (!req.body.title) {
    errors.title = "Title is required";
  } else if (req.body.title && req.body.title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (!req.file) {
    errors.thumbnail = "thumbnail is required";
  }

  const uploadThumbnail = await cloudinary.uploader.upload(req.file.path, {
    folder: "gallery",
    transformation: {
      width: 300,
      height: 300,
      quality: 95,
    },
    unique_filename: true,
  });

  const newAlbum = new albumModel({
    title: req.body.title,
    thumbnail: uploadThumbnail.secure_url,
    publicId: uploadThumbnail.public_id,
  });

  const save = await newAlbum.save();
  if (save) res.status(201).json("save success");
});

//////////////////////////////////////////
////////// Delete album /////////////////
//////////////////////////////////////////

exports.deleteAlbum = asyncHandler(async (req, res, next) => {
  await cloudinary.uploader.destroy(req.query.photo);
  await cloudinary.api.delete_resources_by_prefix(`gallery/${req.params.id}`);
  await cloudinary.api.delete_folder(`gallery/${req.params.id}`);

  const deleteAlbum = await albumModel.deleteOne({ _id: req.params.id });
  if (deleteAlbum) {
    res.status(204).json("delete success");
  }
});
