"use client";

import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchBlogById } from '@/lib/features/blogSlice'; 
import { useEffect } from 'react';
import Image from 'next/image';

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
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-800 mb-4">{post.content}</p>
      <p className="text-gray-600 text-sm mb-4">
        By {post.author} on {post.date}
      </p>
      {post.imageURL && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={post.imageURL}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default PostPage;
