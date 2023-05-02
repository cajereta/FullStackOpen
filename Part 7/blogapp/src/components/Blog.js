import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { notificationSetter } from '../reducers/notificationReducer';

const Blog = ({ user }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const id = useParams().id;
  const blog = useSelector(state => state.blogs ? state.blogs.find(e => e.id === id) : null);
  // const canRemove = user && blog.user.username === user.username ? true : false;
  if (!blog) {
    return null;
  }
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  };

  const like = blog => {
    dispatch(likeBlog(blog));
    dispatch(notificationSetter({ message: `A like for the blog '${blog.title}' by '${blog.author}'`, info: "info" }));
  };

  const remove = blog => {
    dispatch(removeBlog(blog));
  };
  const renderedComments = blog.comments ? blog.comments.map(c => {
    return (
      <li key={Math.random()}>
        {c}
      </li>
    );
  }) : "Nothing to show here";

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, comment));
    setComment("");
  };

  return (
    <div>
      <Link to="/
      ">Go back</Link>
      <div style={style} className='blog'>
        {blog.title} {blog.author}
        {/* <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'show'}
        </button> */}

        <div>
          <div> <a href={blog.url}> {blog.url}</a> </div>
          <div>likes {blog.likes} <button onClick={() => like(blog)}>like</button></div>
          <div>{blog.user && blog.user.name}</div>
          <button onClick={() => remove(blog)}>delete</button>
        </div>

      </div>
      <h2>Comments!</h2>
      Add a comment!
      <form onSubmit={handleSubmit}>
        <input name='comment' type='text' value={comment}
          onChange={({ target }) => setComment(target.value)} />
        <button type='submit'>Post my comment!</button>
      </form>
      <ul>
        {renderedComments}
      </ul>

    </div>
  );
};

Blog.propTypes = {

  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number
  })
};

export default Blog;