'use client'
import React from "react";
import { openPopUp } from "@/lib/features/addPost/addPostSlice";
import { useDispatch } from "react-redux";

function AddPostButton() {
  const dispatch = useDispatch();

  const handleOpen = ()=>{
    
  }

  return (
    <button
      type="button"
      className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      onClick={()=>dispatch(openPopUp())}
    >
      Add Post
    </button>
  );
}

export default AddPostButton;
