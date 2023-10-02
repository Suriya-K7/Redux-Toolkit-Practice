import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost } from "../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { selectedUsers } from "../features/users/userSlice";

const EditPosts = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(id)));

  const canSave = [title, content].every(Boolean) && requestStatus === "idle";

  const users = useSelector(selectedUsers);

  const usersOptions = users.map((user) => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.name}
    </option>
  ));

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setRequestStatus("idle");
        navigate(`/post/${post.id}`);
      }
    }
  };

  useEffect(() => {
    setTitle(post.title);
    setContent(post.body);
    setUserId(post.userId);
  }, []);

  return (
    <section>
      <h2>Edit Post</h2>
      <form className='d-flex flex-coulumn gap-2'>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          className='form-control w-75 mx-auto text-center'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='postAuthor'>Author:</label>
        <select
          id='postAuthor'
          value={userId}
          className='form-control w-75 mx-auto text-center'
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=''></option>
          {usersOptions}
        </select>
        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          className='form-control w-75 mx-auto text-center'
          name='postContent'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className=' btn btn-outline-success w-25 mx-auto mt-2'
          type='button'
          disabled={!canSave}
          onClick={onSavePostClicked}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPosts;
