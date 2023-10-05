import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

/* synchronus way with local data
const initialState = [
  {
    id: 1,
    title: "learning Redux Toolkit",
    content: "its little bit confusing but im picking up",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 2,
    title: "learning Redux Toolkit",
    content: "Gaining Knowledge",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      existingPost.reactions[reaction]++;
    },
  },
});

export const selectedPosts = (state) => state.posts;*/

// asynchronous way in redux

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchposts", async () => {
  const response = await axios.get(POSTS_URL);

  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPosts",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;

    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);

      return response.data;
    } catch (error) {
      console.log(error.message);
      //because of fake json code we are returning newly edited post
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`, initialPost);

      if (response?.status === 200) return initialPost;

      return `${response?.status}:${response?.statusText}`;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  posts: [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  count: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      existingPost.reactions[reaction]++;
    },
    increaseCount(state, action) {
      state.count++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // modifying received data
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();

          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          return post;
        });

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.id = Date.now();
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();

        const posts = state.posts.filter((post) => post.id !== id);

        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;

        const posts = state.posts.filter((post) => post.id !== id);

        state.posts = posts;
      });
  },
});

export const selectedPosts = (state) => state.posts.posts;

export const getPostsStatus = (state) => state.posts.status;

export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const getCount = (state) => state.posts.count;

export const selectPostByUser = createSelector(
  [selectedPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
