import Joi from "joi";

const listingSchema =Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().min(2).max(100).required(),
    country: Joi.string().min(2).max(100).required(),
    image : Joi.string().allow(null, '')
})

export default listingSchema;