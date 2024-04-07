"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const onSignUp = async () => {
    try {
      setLoading(true);
      console.log("User data to be sent:",user);
      const response = await axios.post("/api/signup", user);

      console.log("Login success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
          Sign Up
        </h2>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium leading-6 text-white-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
                className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-base font-medium leading-6 text-white-900"
            >
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={Number(user.mobile)==0? '':Number(user.mobile)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  setUser({ ...user, mobile: value });
                }}
                required
                className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium leading-6 text-white-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium leading-6 text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                className="block w-full rounded-md bg-white/5 border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-indigo-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onSignUp}
              disabled={buttonDisabled}
            >
              Sign Up
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a user?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
