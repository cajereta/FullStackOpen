import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import storageService from './services/storage';
import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { removeNotification, setNotification } from './reducers/notificationReducer';
import { getBlogs } from './reducers/blogReducer';
import BlogList from './components/BlogList';
import UsersList from './components/UsersList';
import User from './components/User';
import Blog from './components/Blog';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // eslint-disable-next-line
  const [_, setBlogs] = useState([]);
  const [user, setUser] = useState('');
  const gotBlogs = useSelector(state => state.blogs);
  const blogs = [...gotBlogs];

  // const [info, setInfo] = useState({ message: null });

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);


  const notifyWith = (message, type = 'info') => {
    dispatch(setNotification({ message, info: type }));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storageService.saveUser(user);
      notifyWith(`Welcome, ${user.name}!`);
    } catch (e) {
      notifyWith('Wrong username or password', 'error');
    }
  };

  const logout = async () => {
    setUser(null);
    storageService.removeUser();
    notifyWith('Logged out');
  };

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    setBlogs(blogs.concat(createdBlog));
    blogFormRef.current.toggleVisibility();
  };



  // const remove = async (blog) => {
  //   const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`);
  //   if (ok) {
  //     await blogService.remove(blog.id);
  //     notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
  //     setBlogs(blogs.filter(b => b.id !== blog.id));
  //   }
  // };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }



  return (
    <div>
      <h2 className='above-header'>blogs</h2>
      <Notification />
      <div className='header-main'>
        <div className='links'>
          <Link to="/">Blogs </Link>  <Link to="/users/">  Users</Link>
        </div>
        <div className='logout-button'>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
      </div>

      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog user={user} />} />
      </Routes>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>

      </div>
    </div>
  );
};

export default App;