import { listingSchema , userSchemaValidation} from "../schema/schema.js";
import {reviewSchema} from "../schema/schema.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const validateListing = (req,res,next)=>{
  if (req.body.geoLocation && typeof req.body.geoLocation === "string") {
  try {
    req.body.geoLocation = JSON.parse(req.body.geoLocation);
  } catch (e) {
    req.body.geoLocation = undefined;
  }
}
  let result = listingSchema.validate(req.body)
  if(result.error){
    throw new ErrorHandler(result.error.details[0].message, 400);
  }
  next();
}

export const validateReview = (req, res, next) => {
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    throw new ErrorHandler(result.error.details[0].message, 400);
  }
  next();
};

export const validateUser = (req, res, next) => {
  let result = userSchemaValidation.validate(req.body);
  if (result.error) {
    throw new ErrorHandler(result.error.details[0].message, 400);
  }
  next();
}