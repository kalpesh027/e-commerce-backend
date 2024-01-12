const express = require("express");
const errormiddleware = require("./middleware/error");

const app = express();
app.use(express.json());

//routes imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);

// middleware for error
app.use(errormiddleware);

module.exports = app;