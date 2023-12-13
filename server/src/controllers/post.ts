import { Request,Response } from "express"

import post from "../services/post"
export const getAllPosts = async (req:Request,res:Response) =>{
    try {
        const posts = await post.getAllPosts();
        res.status(200).json({data:posts});
    }
    catch (error){
        res.status(500).json({data:"Error"})
    }
}
export const createPost = ()=>{

}
export const deletePost = ()=>{

}