import React from 'react'
import { Link } from 'react-router-dom'

const Home:React.FC = () => {
  return (
    <div>
        <h1 className='text-2xl'>Home</h1>
        <Link className='bg-blue-400' to="/createpost">Add Post</Link>
    </div>
  )
}

export default Home