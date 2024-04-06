"use client";
import React from "react";
import AddPostButton from "./ui/AddPostButton";
import LogoutButton from "./ui/LogoutButton";
import { useAppSelector } from "@/lib/store";

function NavBar() {
  const auth = useAppSelector((state) => state.authSliceReducer.value.status);
  //NOTE: add {auth && for addpost and logout}

  return (
    <>
      <header
        className={`shadow flex box-border border-b-[1.5px] transition-all justify-between w-full px-4 py-4`}
      >
        <div className="text-2xl font-semibold">Artically</div>

        {{} && (
          <div className="flex">
            <AddPostButton />
            <LogoutButton />
          </div>
        )}
      </header>
    </>
  );
}

export default NavBar;
