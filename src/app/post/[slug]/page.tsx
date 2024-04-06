'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function page({params}:any) {
    const slug = params.slug;
    const [postDetail,setPostDetail] = useState({})
    const fetchPost = async ()=>{
       try {
         const response = await axios.get(`/api/post?slug=${slug}`);
         console.log(response.data?.data)
       } catch (error) {
          console.log(error)
       }
    }
    
    useEffect(() => {
      fetchPost()
    }, [slug])
    
  return (
    <div>page</div>
  )
}

export default page