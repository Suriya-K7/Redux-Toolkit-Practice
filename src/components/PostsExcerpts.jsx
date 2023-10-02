import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const PostsExcerpts = ({ post }) => {
  return (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 70)}...</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
      <Link
        to={`/post/${post.id}`}
        className='btn btn-secondary'
      >
        View Posts
      </Link>
    </article>
  );
};

export default PostsExcerpts;
