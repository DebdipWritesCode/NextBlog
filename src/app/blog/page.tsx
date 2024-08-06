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
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ marginBottom: '2rem' }}>
            <h2>{blog.title}</h2>
            {blog.imageURL && (
              <Image
                src={blog.imageURL}
                alt={blog.title}
                width={600}
                height={400}
                layout="responsive"
                priority
              />
            )}
            <p>{blog.content}</p>
            <p>By {blog.author} on {blog.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogListPage;
