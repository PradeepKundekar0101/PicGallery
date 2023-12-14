import { deleteObject, getObjectURL, putObjectURL } from "../aws/s3";
import { IPost, Post } from "../model/post";
class PostService{
    async getAllPosts():Promise<IPost[]>{
        const posts = await Post.find();
        for(const post of posts){
            const image_name = post.image_name;
            post.image_url = await getObjectURL(image_name);
        }
        return posts;
    }
    async createPost(content:string,file:Express.Multer.File):Promise<IPost | null>{
        try {
            const imageName = await putObjectURL(file);
            const post = new Post({content:content,image_name:imageName});
            await post.save();
            return post;
        } catch (error:any) {
            console.log(error.message);
            return null;
        }
    }
    async deletePost(postId:string){
        try {
            const postFound = await Post.findById(postId);
            if(!postFound) return null;
            await deleteObject(postFound.image_name);
            await postFound.deleteOne();
            return {}
        } catch (error:any) {
            console.log(error.message);
        }
    }
}
export default new PostService();