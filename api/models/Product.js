const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  img: String,
});

module.exports = model("Product", productSchema);
