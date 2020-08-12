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
    const data = {
        title: "Simple Wordpress Website",
        technologies: "Wordpress, PHP, HTML, CSS",
        budget: "$1000",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ipsum elit, ut maximus orci gravida quis. Nullam porttitor nisl vel sollicitudin interdum. Vestibulum a pulvinar turpis. In pharetra rhoncus nunc tempor tincidunt. Cras feugiat luctus elit, accumsan dapibus massa mollis sit amet. In iaculis rhoncus felis. Donec tempor risus mauris. Suspendisse at mauris gravida, ullamcorper purus vel, hendrerit felis. Sed condimentum tincidunt gravida. Vivamus lobortis fringilla mauris. Duis condimentum ante nec nisl malesuada dictum.",
        contact_email: "user2@gmail.com"
    };

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
