import React from "react";
import "./App.css";
import Counter from "./components/Counter";
import PostsList from "./pages/PostsList";
import NavBar from "./components/navBar/NavBar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path='/counter'
          element={<Counter />}
        />
        <Route
          path='/post'
          element={<PostsList />}
        />
      </Routes>
    </div>
  );
};

export default App;
