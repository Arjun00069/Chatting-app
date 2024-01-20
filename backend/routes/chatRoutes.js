import express from "express"
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { accessChat,fetchChat,
         createGroupChat ,
         renameGroupChat,
         addToGroup,
         removeFromGroup
        } from "../controllers/chatController.js";
const router = express.Router();



router.post('/',isAuthenticated,accessChat);
router.post('/group',isAuthenticated,createGroupChat);


router.put('/rename',isAuthenticated,renameGroupChat);
router.put('/groupremove',isAuthenticated,removeFromGroup);
router.put('/groupadd',isAuthenticated,addToGroup);




router.get('/',isAuthenticated,fetchChat);







export default router;