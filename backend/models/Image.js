const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  imgURL: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imgSchema);

module.exports = Image;
