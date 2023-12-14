import { DeleteObjectCommand, GetObjectCommand,PutObjectCommand} from "@aws-sdk/client-s3"
import { s3Client } from "../config/aws"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'
export const getObjectURL = async(key:string)=>{
    const command = new GetObjectCommand({
        Key:key,
        Bucket:process.env.BUCKET_NAME
    })
    const url = await getSignedUrl(s3Client,command);
    return url;
}
export const putObjectURL = async(file:Express.Multer.File)=>{
    try {
        const imageName = "uploads/user/image-"+Date.now();
        //resize the image
        const buffer = await sharp(file.buffer).resize({height:1920,width:1080,fit:"contain"}).toBuffer();
        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Body: buffer,
            Key: imageName,
            ContentType: file.mimetype,
          }
        await s3Client.send(new PutObjectCommand(uploadParams));
        return imageName;
    } catch (error:any) {
        console.log(error.message);
    }
}
export const deleteObject = async(key:string)=>{
    try {
        const command = new DeleteObjectCommand({
            Key:key,
            Bucket:process.env.BUCKET_NAME
        })
        await s3Client.send(command);
    } catch (error:any) {
        console.log(error.message)
    }
}