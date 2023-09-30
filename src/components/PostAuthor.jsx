import React from "react";
import { useSelector } from "react-redux";
import { selectedUsers } from "../features/users/userSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectedUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
