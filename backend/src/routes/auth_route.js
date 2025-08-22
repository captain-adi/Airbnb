import express from "express"
import { login, ragister } from "../controllers/auth_controller.js";
import { validateUser } from "../middlewares/schemaValidator.js";
const router = express.Router();

router.route('/login').post(login)
router.route("/ragister").post(validateUser,ragister)

export default router