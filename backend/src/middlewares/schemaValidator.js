import listingSchema from "../schema/schema.js";
import ErrorHandler from "../utils/ErrorHandler.js";
const schemaValidator = (req,res,next)=>{
  let result = listingSchema.validate(req.body)
  if(result.error){
    throw new ErrorHandler(result.error.details[0].message, 400);
  }
  next();
}
export default schemaValidator;