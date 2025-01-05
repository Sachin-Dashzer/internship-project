import { Router } from "express";
import { registerUser, loginUser, logoutUser, authMiddleware  } from "../controllers/auth.controllers.js";

const router = Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
});


export default router;