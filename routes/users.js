// routes/users.js
import { Router } from "express";
import { getMemesByUser } from "../controllers/userController.js";


const router = Router();

router.get("/:id/memes", getMemesByUser);

export default router;