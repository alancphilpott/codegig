const express = require("express");
const db = require("./startup/db");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

db.authenticate()
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error Connecting to Database" + err));

const app = express();

app.get("/", (req, res) => res.send("INDEX"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
