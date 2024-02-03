const express = require("express");
const errormiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieparser());

//routes imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// middleware for error
app.use(errormiddleware);

module.exports = app;