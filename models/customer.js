const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  phone: String,
  email: String,
  dob: String,
  address: String,
  city: String,
  state: String,
  products: Array,
});

module.exports = mongoose.model("Customers", customerSchema);
