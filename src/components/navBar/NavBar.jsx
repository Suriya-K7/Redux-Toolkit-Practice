import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container-fluid'>
        <div className='navbar-brand'>Redux & ToolKit Practice</div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mynavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='mynavbar'
        >
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <NavLink
                to={"/counter"}
                className='nav-link'
              >
                Counter
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={"/post"}
                className='nav-link'
              >
                Posts
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={"/post/add"}
                className='nav-link'
              >
                Add Posts
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
