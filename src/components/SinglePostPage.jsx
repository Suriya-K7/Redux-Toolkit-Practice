import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, deletePost } from "../features/posts/postsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(id)));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }

  const onDeletePostClicked = () => {
    try {
      dispatch(
        deletePost({
          id: post.id,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/post`);
    }
  };

  return (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
      <div className='d-flex align-items-center justify-content-center flex-column gap-2'>
        <Link
          to={`/post/edit/${post.id}`}
          className='btn btn-outline-warning'
        >
          Edit Post
        </Link>
        <button
          className='btn btn-outline-danger'
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </div>
    </article>
  );
};

export default SinglePostPage;
