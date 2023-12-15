import express = require('express');
import { createPost, deletePost, getAllPosts } from '../controllers/post';
const router = express.Router();
router.get("/",getAllPosts);
router.delete("/:postId",deletePost)
export default router;