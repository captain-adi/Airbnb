import express from 'express';
import { validateListing } from '../middlewares/schemaValidator.js';
import { showAllListings, showListingById , createListing ,deleteListing, updateListing} from '../controllers/listing_controller.js';
import passport from '../middlewares/passport_middleware.js';
import { isOwner } from '../middlewares/isOwner.js';
const router = express.Router();

router.route('/').get(showAllListings);
router.route('/:id').get(showListingById)
router.route('/').post(validateListing, passport.authenticate('jwt', { session: false }), createListing);
router.route("/:id").delete(passport.authenticate('jwt', { session: false }),isOwner, deleteListing);
router.route('/:id').patch(validateListing ,passport.authenticate('jwt', { session: false }),isOwner,updateListing);


export default router; 