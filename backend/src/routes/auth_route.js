import express from "express"
import { login, ragister, secure } from "../controllers/auth_controller.js";
import passport from '../middlewares/passport_middleware.js';
import { validateUser } from "../middlewares/schemaValidator.js";
const router = express.Router();

router.route('/login').post(login)
router.route("/register").post(validateUser,ragister)
router.route('/secure').get(passport.authenticate('jwt', { session: false }), secure)

export default router