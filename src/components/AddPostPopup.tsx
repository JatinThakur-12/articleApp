"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/app/globals.css";
import { closePopUp } from "@/lib/features/addPost/addPostSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store";
import axios from 'axios'

declare global {
  interface Window {
    RichTextEditor: any;
  }
}

function AddPostPopup({ post }: any) {
  const open = useAppSelector(
    (state) => state.addPostPopupReducer.value.isOpen
  );

  const [postData, setPostData] = useState({
    slug: post?.slug || "",
    title: post?.title || "",
    desc: post?.desc || "",
    category: post?.category || "",
    image: post?.image || "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [editorHtml, setEditorHtml] = useState(postData.desc);

  const refDiv = useRef(null);
  const initializeClick = useRef(null);
  let rte: any;

  // const handleClick = () => {
  //   if(open){
  //     alert(rte.getHTMLCode());
  //     setEditorHtml(rte.getHTMLCode())
      
  //   }
  // }

  useEffect(() => {
    if(open){
      rte = new window.RichTextEditor(refDiv.current);
      rte.setHTMLCode("<b>editorHtml</b>");
      // console.log("Hogaya"+rte.getHTMLCode())
      const handleClick = () =>{
        console.log("initialized");
        return rte.getHTMLCode();
      }

      initializeClick.current = handleClick();

    }
  }, [open]);

  

  

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closePopUp());
  };

  useEffect(() => {
    if (postData.slug.length > 0 && postData.title.length > 0 && postData.category.length > 0 ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [postData]);


  const handleSubmit = async () => {
    try {
      // await handleClick()
      const response = await axios.post("/api/post");
      console.log(response);
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <>
      {open && (
        <div className="popup-container">
          <div className=" p-5 popup-body text-stone-950">
            <button
              className="absolute right-3 top-1 hover:text-red-600"
              onClick={handleClose}
            >
              X
            </button>
            <div className="flex items-start">
              <span className="text-2xl"> Add Post </span>
            </div>
            <div className="flex flex-col px-2 items-start">

              <div className="w-full flex flex-col items-start">
                <label
                  htmlFor="slug"
                  className="block text-base font-normal leading-6 text-black"
                >
                  Slug
                </label>
                <div className="w-1/2 mt-1">
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={postData.slug}
                    onChange={(e) =>
                      setPostData({ ...postData, slug: e.target.value })
                    }
                    required
                    className=" block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col mt-2 items-start">
                <label
                  htmlFor="title"
                  className="block text-base font-normal leading-6 text-black"
                >
                  Title
                </label>
                <div className="w-1/2 mt-1">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={postData.title}
                    onChange={(e) =>
                      setPostData({ ...postData, title: e.target.value })
                    }
                    required
                    className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col mt-2 items-start">
                <label
                  htmlFor="category"
                  className="block text-base font-normal leading-6 text-black"
                >
                  Category
                </label>
                <div className="w-1/2 mt-1">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={postData.category}
                    onChange={(e) =>
                      setPostData({ ...postData, category: e.target.value })
                    }
                    required
                    className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col mt-2 items-start">
                <label
                  htmlFor="desc"
                  className="block text-base font-normal leading-6 text-black"
                >
                  Desription
                </label>
                {/* <RichTextEditor/> */}

                <div ref={refDiv}  className="max-w-[600px]"></div>
              </div>

              <div className="w-full flex flex-col mt-2 items-start">
                <label
                  htmlFor="Image:"
                  className="block text-base font-normal leading-6 text-black"
                >
                  Image
                </label>
                <div className="w-1/2 mt-1">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    placeholder="Provide image url"
                    value={postData.image}
                    onChange={(e) =>
                      setPostData({ ...postData, image: e.target.value })
                    }
                    required
                    className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset placeholder:text-black focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            
            <button className="m-3 px-4 bg-green-500 rounded-md" disabled={buttonDisabled} onClick={()=>initializeClick}>Submit</button>


          </div>
        </div>
      )}
    </>
  );
}

export default AddPostPopup;
