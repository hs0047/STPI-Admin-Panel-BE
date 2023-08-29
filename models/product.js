const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  monthlySubscription: Number,
  additionalComments: String,
  tag: String,
});

module.exports = mongoose.model("Products", productSchema);
