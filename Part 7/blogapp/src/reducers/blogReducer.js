import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";


const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    voteBlog(state, action) {
      const id = action.payload.id;
      return state.map(b => b.id !== id ? b : action.payload);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter(b => b.id !== id);
    },
    addComment(state, action) {
      const id = action.payload.id;
      return state.filter(b => b.id !== id ? b : action.payload).concat(action.payload);
    }
  }
});

export const { addBlog, setBlogs, voteBlog, deleteBlog, addComment } = blogSlice.actions;

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};


export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsService.create(content);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = content => {
  return async dispatch => {
    const likedBlog = await blogsService.update(content);
    dispatch(voteBlog(likedBlog));
  };
};

export const removeBlog = content => {
  return async dispatch => {
    await blogsService.remove(content.id);
    dispatch(deleteBlog(content.id));
  };
};

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = await blogsService.addComment(blog.id, comment);
    dispatch(addComment(commentedBlog));
  };
};
export default blogSlice.reducer;