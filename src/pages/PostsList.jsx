import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedPosts,
  getPostsError,
  fetchPosts,
  getPostsStatus,
} from "../features/posts/postsSlice";
import AddPostForm from "../components/AddPostForm";
import PostsExcerpts from "../components/PostsExcerpts";

const PostsList = () => {
  const posts = useSelector(selectedPosts);

  const postStatus = useSelector(getPostsStatus);

  const postError = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const anotherFormatPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  // const formatedPost = posts.slice().reverse();

  let content;

  if (postStatus === "loading") {
    content = <p>"loading"</p>;
  } else if (postStatus === "succeeded") {
    content = anotherFormatPost.map((post) => (
      <PostsExcerpts
        key={post.id}
        post={post}
      />
    ));
  } else {
    content = <p>{postError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      <AddPostForm />
      {content}
    </section>
  );
};

export default PostsList;
