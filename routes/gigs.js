const express = require("express");
const router = express.Router();
const db = require("../config/db");
const Gig = require("../models/Gig");

// Get Gig List
router.get("/", (req, res) =>
    Gig.findAll()
        .then((gigs) => {
            console.log(gigs);
            res.render("gigs", {
                gigs: gigs.map((gig) => gig.toJSON())
            });
        })
        .catch((err) => console.log("Error Retrieving Gigs" + err))
);

// Display Add Gig Form
router.get("/add", (req, res) => res.render("add"));

// Add a Gig
router.post("/add", (req, res) => {
    let { title, technologies, budget, description, contact_email } = data;

    // Insert Into Table
    Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email
    })
        .then((gig) => res.redirect("/gigs"))
        .catch((err) => console.log("Error Adding Gig" + err));
});

module.exports = router;
