'use client'
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Posts from "@/components/Posts";
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast'
import AddPostPopup from "@/components/AddPostPopup";
import { addPosts } from "@/lib/features/postStore/postSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store";

import AddPostButton from "@/components/ui/AddPostButton";

function page() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [pageLength, setPageLength] = useState(0);
  const dispatch = useDispatch();

  const fetchAllPost = async() =>  {
    try {
      const response = await axios.get('/api/allpost');
      const resData = response.data;
      console.log(resData);
      dispatch(addPosts(resData.data))
      setPosts(resData.data);
      setPageLength(resData.pages);

    } catch (error: any) {

      setError(true);
      toast("Error:",error);
      setTimeout(() => {
        setError(false);
      }, 4000);

    }
  }
  

  useEffect(() => {
    fetchAllPost()

  }, [])
  
  return (
    <>
      {/* <button onClick={() => setOpen(true)}> Click to Open Popup</button> */}
      {error && <Toaster position="bottom-right"/>}
      <div>
        <Container>
          <Posts data={posts}/>
        </Container>
      </div>
      <AddPostPopup text="Hello there!" /> 
    </>
  );
}

export default page;
