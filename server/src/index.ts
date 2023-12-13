import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import postRoutes from './routes/post'
import mongoose, { Error } from 'mongoose';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

const connect = async()=>{
    try {
        const MONGOURI = process.env.MONGO_URI;
        await mongoose.connect(MONGOURI as string);
        console.log("DB connected");
    } catch (error:any) {
        console.log(error.message)
    }
}
connect();

const PORT = process.env.PORT || 8080
app.get("/",(req,res)=>{res.send("Hello from the backend")});
app.use("/api/v1/post",postRoutes);

app.listen(PORT,()=>{
    console.log("Server is up and running at PORT "+PORT);
})
