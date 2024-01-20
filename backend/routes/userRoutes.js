import express from "express"
import { registerUser,authUser,getUsers } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/register',registerUser)
router.post('/login',authUser)



router.get('/',isAuthenticated,getUsers)

export default router;