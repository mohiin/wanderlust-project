// const Joi = require("joi");

// const listingSchema = Joi.object({
//     listing : Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         image: Joi.object({
//             url: Joi.string().required(),
//         }).optional(),
//     }).required()
    
// });






const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0),
    location: Joi.string(),
    country: Joi.string(),
    image: Joi.object({
      url: Joi.string(),
    }),
  }).required(),
});

module.exports = listingSchema;

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required(),
    createdAt: Joi.date(),
  }).required(),
});