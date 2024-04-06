'use client'
import React from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { logout as authLogout} from "@/lib/features/authStore/authSlice";
import { useRouter } from "next/navigation";
function LogoutButton() {
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = async () => { 
        try {
            await axios.get("/api/logout")
            dispatch(authLogout());
            router.push("/");

        } catch (error) {
            
        }
        
    }
  return (
    <button
      type="button"
      className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      onClick={logout}
    >
        Logout
    </button>
  );
}

export default LogoutButton;
