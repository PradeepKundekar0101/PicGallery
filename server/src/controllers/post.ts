import { Request,Response } from "express"

import post from "../services/post"
export const getAllPosts = async (req:Request,res:Response) =>{
    try {
        const posts = await post.getAllPosts();
        res.status(200).send({data:posts});
    }
    catch (error){
        res.status(500).json({data:"Error"})
    }
}
export const createPost = async (req:Request,res:Response)=>{
    try {
        if(!req.file) return;
       const response = await post.createPost(req.body.content,req.file)
       res.json({response})
    } catch (error) {
        
    }
}
export const deletePost = async(req:Request,res:Response)=>{
    try {
        if(!req.params.postId) res.status(404).json({data:"PostId Not found"});
        const response = await post.deletePost(req.params.postId);
        if(!response){
            res.status(404).json({data:"Post with this id was not found"});
        }
        res.status(200).json({data:"Deleted"})
    } catch (error:any) {
        console.log(error.message)
    }
}