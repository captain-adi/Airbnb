import express from 'express';
import { validateListing } from '../middlewares/schemaValidator.js';
import { showAllListings, showListingById , createListing ,deleteListing, updateListing} from '../controllers/listing_controller.js';
import passport from '../middlewares/passport_middleware.js';
const router = express.Router();

router.route('/').get(showAllListings);
router.route('/:id').get(showListingById)
router.route('/').post(validateListing, passport.authenticate('jwt', { session: false }), createListing);
router.route("/:id").delete(deleteListing);
router.route('/:id').patch(validateListing,updateListing);


export default router; 