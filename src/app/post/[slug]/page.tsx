"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import parse from "html-react-parser";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  image: string;
  author?: {
    _id: string;
    name: string;
    // Add other properties of the author if needed
  };
  // Add other properties of the post if needed
}

export default function page({ params }: any) {
  const router = useRouter();
  const slug = params.slug;
  const [post, setPost] = useState<Post | null>(null);

  const userData = useAppSelector((state) => state.authSliceReducer.value.id);
  const isAuthor = post && userData ? post.author?._id === userData : false;

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/post?slug=${slug}`);
      console.log(response.data?.data);
      setPost(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async() =>{
    try {
      const response = await axios.delete(`/api/post?slug=${post?.slug}`)
      if(response.data.data._id){
        router.push("/home")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [slug]);

  return post ? (
    <>
      <div className="py-3">
        <Container maxWidth="max-w-3xl relative pt-8">
          {isAuthor && (
            <div className="flex gap-x-3 items-end justify-end">
              <Link href={``}>
                <button className="rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm bg-green-500">
                  Edit
                </button>
              </Link>
              <button className="rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm bg-red-500" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div>
              <span className="text-sm">By {post.author?.name}</span>
            </div>
          </div>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img src={post.image} alt={post.title} className="rounded-xl" />
          </div>
          <div className="browser-css">{parse(post.desc)}</div>
        </Container>
      </div>
    </>
  ) : null;
}
