import express from 'express';
import { createPost, deletePost, getAllPosts } from '../controllers/post';
const router = express.Router();
router.get("/",getAllPosts);
router.post("/",createPost);
router.delete("/:postId",deletePost)
export default router;