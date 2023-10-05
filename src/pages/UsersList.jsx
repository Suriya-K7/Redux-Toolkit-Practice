import React from "react";
import { useSelector } from "react-redux";
import { selectedUsers } from "../features/users/userSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectedUsers);

  const renderedUser = users.map((user) => (
    <Link
      key={user.id}
      to={`/user/${user.id}`}
      className='list-group-item list-group-item-action list-group-item-dark'
    >
      <span>{user.name}</span>
    </Link>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul className='list-group'>{renderedUser}</ul>
    </section>
  );
};

export default UsersList;
