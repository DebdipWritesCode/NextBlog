"use client";

import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchBlogById } from '@/lib/features/blogSlice'; 
import { useEffect } from 'react';

const PostPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id[0]));
    }
  }, [id, dispatch]);

  const { post, loading, error } = useSelector((state: RootState) => state.blog);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!post) return <div>No post found</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>By {post.author} on {post.date}</p>
      <img src={post.imageURL} alt={post.title} />
    </div>
  );
};

export default PostPage;
