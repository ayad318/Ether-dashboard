require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(cors());

let log = console.log;

// Import routes
const addressRoutes = require("./routes/address");
app.use("/", addressRoutes);

//connect to db
log("connecting to mongodb...");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  log("connected to db");
});

app.listen(process.env.PORT);
log("listening on PORT " + process.env.PORT);
