import { Router } from "express";
import { getAllUser } from "../controllers/user.controllers.js";

const router = Router();


router.route('/all-user').get(getAllUser);



export default router;