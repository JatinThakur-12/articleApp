"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Posts from "@/components/Posts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddPostPopup from "@/components/AddPostPopup";
import { addPosts } from "@/lib/features/postStore/postSlice";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [pageLength, setPageLength] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const author = searchParams.get('author')


  const fetchAllPost = async () => {
    try {
      const queryCategory = category ? `&category=${category}` : "";
      const response = await axios.get(`/api/allpost?page=${page}&limit=10${queryCategory}`);
      const resData = response.data;
      console.log(resData);
      setPosts(resData.data);
      setPageLength(resData.pages);
      dispatch(addPosts(resData.data));
    } catch (error: any) {
      setError(true);
      toast("Error:", error);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    fetchAllPost();
  }, [page,category]);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}> Click to Open Popup</button> */}
      {error && <Toaster position="bottom-right" />}
      <div className="md:w-3/4 text-white!">
        <Container props="mt-2">
          <Stack spacing={3}>
            <Posts data={posts} />
            <Pagination
              count={pageLength}
              page={page}
              color="primary"
              onChange={handlePageChange}
              sx={{
                ".css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root": {
                  color: "white !important",
                },
              }}
            />
          </Stack>
        </Container>
      </div>
      <AddPostPopup post="Hello there!" />
    </>
  );
}


