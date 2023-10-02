import React from "react";
import "./App.css";
import Counter from "./components/Counter";
import PostsList from "./pages/PostsList";
import NavBar from "./components/navBar/NavBar";
import { Routes, Route } from "react-router-dom";
import AddPostsForm from "./components/AddPostForm";
import SinglePostPage from "./components/SinglePostPage";
import EditPosts from "./components/EditPosts";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path='/counter'
          element={<Counter />}
        />
        <Route path='/post'>
          <Route
            index
            element={<PostsList />}
          />
          <Route
            path='add'
            element={<AddPostsForm />}
          />
          <Route
            path=':id'
            element={<SinglePostPage />}
          />{" "}
          <Route
            path='edit/:id'
            element={<EditPosts />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
