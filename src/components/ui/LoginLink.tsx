import Link from "next/link";
import React from "react";

function LoginLink() {
  return (
    <>
      <Link
        href="/login"
        type="button"
        className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
       Login
      </Link>
    </>
  );
}

export default LoginLink;
