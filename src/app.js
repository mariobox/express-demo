const express = require("express");
const app = express();

// Call package.json so we can use some variables in our templates
const site = require("../package.json");

// Call our car information file
const cars = require("../src/cars.json");

const port = 3000;

// Set our template engine of choice
app.set("view engine", "pug");

// Select the public folder to place our images, css and js
app.use(express.static("public"));

// Basic Routes
app.get("/", (req, res) => {
  res.render("index", {
    message: site.description,
    title: site.name
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    message: site.description
  });
});

// Dynamic Routes

// variable to use later
let selectedBrand = "";

app.get("/:brand", (req, res) => {
  // Get information from selected brand so we can send to the template
  for (let i = 0; i < cars.length; i++) {
    if (cars[i]["brand"] === req.params.brand) {
      selectedBrand = cars[i];
    }
  }
  res.render("cars", {
    currentBrand: selectedBrand
  });
});

// Web Server
app.listen(3000, () => {
  console.log(`Listening at port ${port}`);
});
