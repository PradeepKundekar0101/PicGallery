import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {config} from '../config/server'
export const useGetPosts = ()=>{
    const {api_url} = config;
    return useQuery({
        queryKey:["posts"],
        queryFn:async()=>{
            return await axios.get(api_url+"/api/v1/post");
        }
    })
}