const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer.js");
const Product = require("./models/product.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@mygitdb.v0gnkoy.mongodb.net/STPI_ADMIN_PANEL",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
console.log("Connected SUccessfully to DB");
// Add/Edit Customer

app.post("/alterCustomer", async (req, res) => {
  const { ...data } = req.body;
  console.log(data);
  if (data?.id) {
    await Customer.findByIdAndUpdate(data?.id, data);
    res.send("Customer updated");
  } else {
    const customer = new Customer(data);
    await customer.save();
    res.send("Customer added");
  }
});

// Add/Edit Product
app.post("/alterProduct", async (req, res) => {
  const { ...data } = req.body;

  if (data.id) {
    await Product.findByIdAndUpdate(data.id, data);
    res.send("Product updated");
  } else {
    const product = new Product(data);
    await product.save();
    res.send("Product added");
  }
});

// Get Customers
app.get("/getCustomers", async (req, res) => {
  const customers = await Customer.find();
  console.log(customers);
  res.json(customers);
});

// Get Products
app.get("/getProducts", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Delete Customer
app.delete("/deleteCustomer/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.send("Customer deleted");
});

// Delete Product
app.delete("/deleteProduct/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted");
});

// Add product list to a customer
app.post("/customer/:id/addProducts", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const { products } = req.body; // Array of product IDs

  customer.products = products;
  await customer.save();

  res.send("Product list added to customer");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
