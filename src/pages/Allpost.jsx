import React, { useEffect, useState } from 'react'
import { Container,PostCard } from '../components'
import appwriteservice from '../appwrite/config'
import Postcard from '../components/Postcard'
function allpost() {
    const [posts,setposts]=useState([])
    useEffect(()=>{} ,[])
    appwriteservice.getposts([]).then((posts)=>setposts(posts.documents))
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
        </Container>
      
    </div>
  )
}

export default allpost
