"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { searchBlogs, setSearchQuery } from '@/lib/features/blogSlice';
import { AppDispatch, RootState } from '@/lib/store';
import useDebounce from '@/hooks/useDebounce';
import useAuth from '@/hooks/useAuth';

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

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      //TODO handle logout
    } else {
      router.push('/login');
    }
  };

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  const handleResultClick = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  if(loading) {
    return (
      null
    )
  }

  return (
    <nav>
      <input
        type="text"
        placeholder="Search blogs..."
        value={inputValue}
        onChange={handleSearchChange}
      />
      <button onClick={handleLoginLogout}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
      {isAuthenticated && (
        <button onClick={handleCreatePost}>Create Post</button>
      )}
      {loading && <p>Loading...</p>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((blog) => (
            <li key={blog.id} onClick={() => handleResultClick(blog.id)}>
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;