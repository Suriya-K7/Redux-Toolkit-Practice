import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../features/posts/postsSlice";
import { selectedUsers } from "../features/users/userSlice";

const AddPostsForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectedUsers);

  const canSave = Boolean(title) && Boolean(content);

  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    dispatch(postAdded(title, content, userId));

    setTitle("");
    setContent("");
    setUserId("");
  };

  const usersOptions = users.map((user) => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
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
          className=' btn btn-success w-25 mx-auto'
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

export default AddPostsForm;
