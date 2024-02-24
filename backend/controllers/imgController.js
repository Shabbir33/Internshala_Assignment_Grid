const fs = require("fs");
const Image = require("../models/Image");

const createImage = async (req, res) => {
  console.log(req.file);
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  console.log("Hello");

  const imgDoc = await Image.create({
    imgURL: newPath,
  });

  res.json(imgDoc);
};

const getImages = async (req, res) => {
  res.json({
    images: await Image.find(),
  });
};

const getSingleImage = async (req, res) => {
  const { id } = req.params;
  const singleImage = await Image.findById(id);

  res.json({ singleImage });
};

const deleteImage = async (req, res) => {
  try {
    const imageID = req.params.id;

    await Image.deleteOne({ id: imageID });

    res.json({ success: "Record deleted" });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = { createImage, getImages, getSingleImage, deleteImage };
