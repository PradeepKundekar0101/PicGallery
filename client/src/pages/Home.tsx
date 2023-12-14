import React from 'react'
import { Link } from 'react-router-dom'
import { useGetPosts } from '../hooks/useGetPosts'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {config} from "../config/server"

const Home:React.FC = () => {
    const {data:posts,error,status} = useGetPosts();
    const {mutate,status:deleteStatus,error:deleteError} = useMutation({
        mutationKey:["dds"],
        mutationFn:async(postId:string)=>
        { 
           await axios.delete(config.api_url+"/api/v1/post/"+postId);
        }
    })
    if(status=="pending") return <h1>Loading...</h1>
    if(status=="error") return <h1>{error.message}</h1>
    
  return (
    <div className='mx-10'>
        <h1 className='text-5xl font-bold my-5'>Home</h1>
        <div className='flex justify-end'>
        <Link className='bg-blue-500 py-1 px-3 rounded-sm text-white' to="/createpost">Add Post</Link>
        </div>
        <div className='posts flex flex-col items-center'>
        { posts.data.data.map((post:any,key:number)=>{return <div className='my-5 bg-slate-50 shadow-md py-5' key={key}>
                <img className='h-96 w-72' src={post.image_url} alt="image" />
                <h1 className='text-xl px-5'>{post.content}</h1>
                <div className='flex justify-end px-5'>
                 <button onClick={()=>{mutate(post._id)}} className='bg-red-500 text-white py-1 px-3'>{deleteStatus=="pending"?"Deleting":"Delete"}</button>
                    <h1>{deleteError && deleteError.message}</h1> 
                </div>
        
            </div>
            
        })}
        </div>
        
    </div>
  )
}

export default Home