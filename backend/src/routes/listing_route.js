import express from 'express';
import { validateListing } from '../middlewares/schemaValidator.js';
import { showAllListings, showListingById , createListing ,deleteListing, updateListing} from '../controllers/listing_controller.js';
const router = express.Router();

router.route('/').get(showAllListings);
router.route('/:id').get(showListingById)
router.route('/').post(validateListing,createListing);
router.route("/:id").delete(deleteListing);
router.route('/:id').patch(validateListing,updateListing);


export default router;