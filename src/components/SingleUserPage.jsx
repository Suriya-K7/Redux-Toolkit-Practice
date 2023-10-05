import React from "react";
import { Link, useParams } from "react-router-dom";
import { selectedUserById } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { selectPostByUser, selectedPosts } from "../features/posts/postsSlice";

const SingleUserPage = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectedUserById(state, Number(id)));

  // const userPosts = useSelector((state) => {
  //   const allPosts = selectedPosts(state);

  //   return allPosts.filter((post) => post.userId === Number(id));
  // });

  const userPosts = useSelector((state) => selectPostByUser(state, Number(id)));

  const postTitles = userPosts.map((post) => (
    <Link
      key={post.id}
      to={`/post/${post.id}`}
      className='list-group-item list-group-item-action list-group-item-dark'
    >
      <span>{post.title}</span>
    </Link>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol className='list-group'>{postTitles}</ol>
    </section>
  );
};

export default SingleUserPage;
