import express  from "express";
import { createComment, getPostComments } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.post('/getPostComments/:postId', getPostComments);

export default router;