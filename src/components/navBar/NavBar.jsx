import React from "react";
import { NavLink } from "react-router-dom";

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
                href='javascript:void(0)'
              >
                Counter
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={"/post"}
                className='nav-link'
                href='javascript:void(0)'
              >
                Posts
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
