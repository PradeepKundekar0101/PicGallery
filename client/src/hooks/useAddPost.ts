import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import { config } from "../config/server"
export const useAddPost = (content:string,file:File)=>{
    const {api_url} = config;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", file);
    return useMutation({
        mutationKey:["createPost"],
        mutationFn:async()=>{
            return axios.post(api_url,formData);
        }
    })
}