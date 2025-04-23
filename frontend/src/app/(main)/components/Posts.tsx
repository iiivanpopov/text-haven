"use client";

import Post from "@components/Post";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useEffect } from "react";
import { fetchPosts } from "@store/actions/postsActions";

export default function Posts() {
  const { posts } = useAppSelector((state) => state.postsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return posts.map(({ id, name: title, content, createdAt }) => {
    return (
      <Post key={id} id={id} title={title} content={content} date={createdAt} />
    );
  });
}
