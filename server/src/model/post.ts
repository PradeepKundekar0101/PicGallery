import mongoose from "mongoose"
export interface IPost{
    content:string,
    image_name:string,
    image_url:string,
    createdAt?:Date,
    updatedAt:Date
}
const PostSchema = new mongoose.Schema<IPost>({
    content:{
        type:String,
        min:[3,"content must be of atleast 3 characters"],
        required:true
    },
    image_name:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        default:""
    }
},{
    timestamps:true
})
const Post = mongoose.model<IPost>("Post",PostSchema);

export {Post};
