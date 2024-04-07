"use client";
import React, { useEffect } from "react";
import AddPostButton from "./ui/AddPostButton";
import LogoutButton from "./ui/LogoutButton";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { login, logout } from "@/lib/features/authStore/authSlice";
import axios from 'axios'
import Link from "next/link";


function NavBar() {
  const dispatch = useDispatch();

  // making this request because on page reload states are getting flushed
  const fetchCurrentUser = async()=>{
    try {
      const response = await axios.get("/api/account/getuser"); 
      if(response.data.data){
        dispatch(login(response.data.data))
      }else{
        dispatch(logout())
      }
    } catch (error) {
      console.log('')
    }
  }
  useEffect(()=>{
    fetchCurrentUser()
  })

  const auth = useAppSelector((state) => state.authSliceReducer.value.status);


  //NOTE: add {auth && for addpost and logout}

  return (
    <>
      <header
        className={`shadow flex box-border border-b-[1.5px] transition-all justify-between w-full px-4 py-4`}
      >
        <div className="text-2xl font-semibold"><Link href ="/home">Artically</Link></div>

        {auth? (
          <div className="flex">
            <AddPostButton />
            <LogoutButton />
          </div>
        ):""}
      </header>
    </>
  );
}

export default NavBar;
