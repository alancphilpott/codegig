const { Sequelize } = require("sequelize");
const Joi = require("joi");
const db = require("../config/db");

const Gig = db.define("gig", {
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    }
});

function validateGig(gig) {
    const schema = Joi.object({
        title: Joi.string().min(4).max(200).required(),
        technologies: Joi.string().min(4).max(200).required(),
        budget: Joi.string().min(1).max(20),
        description: Joi.string().min(4).max(450).required(),
        contact_email: Joi.string().min(6).max(200).required()
    });

    return schema.validate(gig);
}

module.exports.Gig = Gig;
module.exports.validateGig = validateGig;
