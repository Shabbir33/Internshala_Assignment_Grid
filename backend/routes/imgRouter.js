const express = require("express");
const imgController = require("../controllers/imgController");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "./uploads/" });

const router = express.Router();

router
  .route("/image")
  .post(uploadMiddleware.single("file"), imgController.createImage)
  .get(imgController.getImages);

router
  .route("/image/:id")
  .get(imgController.getSingleImage)
  .delete(imgController.deleteImage);

module.exports = router;
