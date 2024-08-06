"use client";

import useAuth from "@/hooks/useAuth";
import { createBlog } from "@/lib/features/blogSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageURL: string;
}

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");

  const { user } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  async function formSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    const newPost: Blog = {
      id: Math.floor(Math.random() * 1000).toString(),
      title,
      content,
      author: user?.username as string,
      date: formatDate(new Date()),
      imageURL,
    };

    try {
      const responseData = await dispatch(createBlog(newPost));
      if (responseData) {
        router.push("/blog");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className=" flex h-[650px] w-full justify-center items-center">
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg w-[90%]">
        <h1 className="text-center mb-4 font-bold text-2xl">Create your Post</h1>
        <form onSubmit={(e) => formSubmitHandler(e)} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Image URL"
              required
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="content"
              id="content"
              placeholder="Tell your story..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
