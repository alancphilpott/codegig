const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { Gig, validateGig } = require("../models/Gig");

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
    let { title, technologies, budget, description, contact_email } = req.body;

    const { error } = validateGig(req.body);

    if (error) {
        // Re-Render The Form
        return res.status(400).render("add", {
            error: error.details[0].message,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    } else {
        budget == "" ? (budget = "Unknown") : (budget = `$${budget}`);

        // Make Lower Case and Remove Space After Comma
        technologies = technologies.toLowerCase().replace(/, /g, ",");

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
    }
});

module.exports = router;
