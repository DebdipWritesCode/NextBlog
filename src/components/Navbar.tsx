"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { searchBlogs, setSearchQuery } from '@/lib/features/blogSlice';
import { AppDispatch, RootState } from '@/lib/store';
import useDebounce from '@/hooks/useDebounce';
import useAuth from '@/hooks/useAuth';
import { logoutAsync } from '@/lib/features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { searchQuery, searchResults, loading } = useSelector((state: RootState) => state.blog);
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setSearchQuery(inputValue));
    if (debouncedQuery) {
      dispatch(searchBlogs(debouncedQuery));
    }
  }, [debouncedQuery, dispatch, inputValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleLoginLogout = async () => {
    if (isAuthenticated) {
      try {
        await dispatch(logoutAsync()).unwrap();
        router.push('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    } else {
      router.push('/login');
    }
  };

  const handleCreatePost = () => {
    setInputValue("");
    router.push('/blog/create');
  };

  const handleResultClick = (id: string) => {
    setInputValue("");
    router.push(`/blog/posts/${id}`);
  };

  if(loading) {
    return (
      null
    )
  }

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search blogs..."
          name='search'
          id='search'
          value={inputValue}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={handleLoginLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
        {isAuthenticated && (
          <button 
            onClick={handleCreatePost}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Create Post
          </button>
        )}
      </div>
      {searchResults.length > 0 && inputValue.length && (
        <ul className="absolute top-[50px] bg-white shadow-lg mt-2 p-4 border border-gray-200 rounded-md w-full max-w-md">
          {searchResults.map((blog) => (
            <li 
              key={blog.id} 
              onClick={() => handleResultClick(blog.id)}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
            >
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600">{blog.author}</p>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;