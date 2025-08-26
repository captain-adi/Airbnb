import express from "express"
import { login, ragister, logout,checkLogin} from "../controllers/auth_controller.js";
import passport from '../middlewares/passport_middleware.js';
import { validateUser } from "../middlewares/schemaValidator.js";
const router = express.Router();

router.route('/login').post(login)
router.route("/register").post(validateUser,ragister)
router.route('/logout').post(passport.authenticate('jwt', { session: false }), logout)
router.route('/me').get(passport.authenticate('jwt', { session: false }), checkLogin)

export default router