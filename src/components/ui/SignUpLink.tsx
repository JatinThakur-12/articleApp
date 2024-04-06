import Link from "next/link";
import React from "react";

function SignUpLink() {
  return (
    <>
      <Link
        href="/signup"
        type="button"
        className="rounded-full bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        SingUp
      </Link>
    </>
  );
}

export default SignUpLink;
