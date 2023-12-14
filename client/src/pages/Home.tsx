import React from 'react'
import { Link } from 'react-router-dom'
import { useGetPosts } from '../hooks/useGetPosts'

const Home:React.FC = () => {
    const {data:posts,error,status} = useGetPosts();
    if(status=="pending") return <h1>Loading...</h1>
    if(status=="error") return <h1>{error.message}</h1>
    console.log(posts.data.data);
  return (
    <div>
        <h1 className='text-2xl'>Home</h1>
        <Link className='bg-blue-400' to="/createpost">Add Post</Link>
        { posts.data.data.map((post:any,key:number)=>{return <div key={key}>
                <h1>{post.content}</h1>
                <img className='h-72 w-36' src={post.image_url} alt="image" />
            </div>
            
        })}
    </div>
  )
}

export default Home