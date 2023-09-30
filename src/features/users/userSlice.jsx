import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* scynchronus way with local data
const initialState = [
  {
    id: "0",
    name: "Suriya",
  },
  {
    id: "1",
    name: "K7",
  },
  {
    id: "2",
    name: "Dev",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});*/

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);

  return response.data;
});

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectedUsers = (state) => state.users;

export default usersSlice.reducer;
