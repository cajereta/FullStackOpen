import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import loginService from "../services/login";
import storageService from "../services/storage";

const initialState = {
  user: null,
  users: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogged(state, action) {
      return { ...state, user: action.payload };
    },
    setUsers(state, action) {
      return { ...state, users: action.payload };
    }
  }
});

export const { setLogged, setUsers } = userSlice.actions;

export const loggedUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password });
    userService.setToken(user.token);
    storageService.saveUser(user);
    dispatch(setLogged(user));
  };
};

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;