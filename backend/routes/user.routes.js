import { Router } from "express";
import { getAllUser , sendRequest , requestResponse , deleteFriend , allFriends , allRequest } from "../controllers/user.controllers.js";

const router = Router();


router.route('/all-user').get(getAllUser);
router.route('/send-request').post(sendRequest);
router.route('/request-response').post(requestResponse);
router.route('/delete-friend').post(deleteFriend);
router.route('/get-friends').post(allFriends);
router.route('/get-request').post(allRequest);


export default router;