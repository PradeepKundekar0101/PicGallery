import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import { config } from "../config/server"
export const useAddPost = (content:string,file:File)=>{
    const {api_url} = config;
    
   
}