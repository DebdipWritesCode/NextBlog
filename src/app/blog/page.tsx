"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/lib/features/blogSlice';
import { AppDispatch, RootState } from '@/lib/store';
import Image from 'next/image';

const BlogListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog List</h1>
      <ul className="space-y-8">
        {blogs.map((blog) => (
          <li key={blog.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            {blog.imageURL && (
              <div className="mb-4">
                <Image
                  src={blog.imageURL}
                  alt={blog.title}
                  width={600}
                  height={400}
                  layout="responsive"
                  priority
                  className="rounded-md"
                />
              </div>
            )}
            <p className="text-gray-700 mb-4">{blog.content}</p>
            <p className="text-gray-500 text-sm">
              By {blog.author} on {blog.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogListPage;
