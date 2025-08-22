import Joi from "joi";

const listingSchema =Joi.object({
    title: Joi.string().min(2).max(100).trim().required(),
    description: Joi.string().min(10).max(1000).trim().required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().min(2).max(100).trim().required(),
    country: Joi.string().min(2).max(100).trim().required(),
    image : Joi.string().allow(null, '')
})

const reviewSchema = Joi.object({
    comment: Joi.string().min(2).max(500).required(),
    rating: Joi.number().min(1).max(5).required()
})

const userSchemaValidation = Joi.object({
    username : Joi.string().min(3).max(20).trim().required(),
    email : Joi.string().email().trim().required(),
    password : Joi.string().min(6).max(12).trim().required()
})

export { listingSchema, reviewSchema, userSchemaValidation };