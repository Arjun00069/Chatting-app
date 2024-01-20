import express from "express"
import { sendMessage,allMessage } from "../controllers/messageControllers.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post('/',isAuthenticated,sendMessage)
router.get('/:chatId',isAuthenticated,allMessage)



export default router;