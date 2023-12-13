import { IPost, Post } from "../model/post";

class PostService{
    async getAllPosts():Promise<IPost[]>{
        const posts = await Post.find();
        return posts;
    }
}
export default new PostService();