const express = require("express");
const db = require("./config/db");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

db.authenticate()
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error Connecting to Database" + err));

const app = express();

// Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig Routes
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
