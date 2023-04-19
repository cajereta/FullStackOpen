import { useEffect, useState, useRef } from "react";
import loginService from "./services/login";
import blogService from "./services/blog";
import BlogItem from "./components/BlogItem";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Toggable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import "./app.css";
import Footer from "./components/Footer";


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  ///Blogs body???
  const blogFormRef = useRef();
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [updater, setUpdater] = useState(null);


  useEffect(() => {
    async function getBlogs() {
      const result = await blogService.getAll();
      setBlogs(result);
    }
    getBlogs();
  }, [updater]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notificationUpdater = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const addingBlog = await blogService.create(blogObject);
    const { name } = user;
    setBlogs(blogs.concat({ ...addingBlog, name }));
    notificationUpdater("green", "Blog added successfully");
    setUpdater(Math.random());
    // } catch (error) {
    //   notificationUpdater("red", "There was an error adding your blog");
    // }
  };

  const updateLikes = async (id) => {
    const blog = await blogs.find(n => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    const updatingLikes = await blogService.updateLike(changedBlog, id);

    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatingLikes));
    setUpdater(Math.random());
    // blogs.map(blog => blog.id !== id ? blog : updatingLikes)
  };

  const deleteBlog = async (id) => {
    const blogsToUpdate = blogs.filter(n => n.id !== id);
    await blogService.deleteBlog(id);
    setBlogs(blogsToUpdate);
  };

  // const userChecker = user ? user.name : "";

  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes).map(b => {
    return (
      <BlogItem key={b.id} title={b.title} author={b.author} url={b.url} likes={b.likes} creator={b.user.name} updateLikes={updateLikes} id={b.id} deleteBlog={deleteBlog} user={user} />
    );
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username, password

      });
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      notificationUpdater("green", `Loggin in as ${user.name} `);
      setUsername("");
      setPassword("");

    } catch (exception) {
      console.log("Wrong credentials");
      notificationUpdater("red", "Wrong credentials");
    }
  };

  return (
    <div className="App">
      {notificationMessage && <Notification message={notificationMessage} type={notificationType} />}
      {!user && <Toggable buttonLabel="Log in" closeLabel="Cancel">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}

        />
      </Toggable>}
      {user && <div>
        <p>{user.name} logged in <button onClick={() => {
          window.localStorage.removeItem("loggedBlogappUser");
          setUser(null);
        }}>Logout</button></p>
        {blogsToShow}
        <Toggable id="blog-form-button" buttonLabel="Add a new blog!" ref={blogFormRef} closeLabel="Cancel">
          <BlogForm
            createBlog={addBlog}
            user={user.name}
          />
        </Toggable>

      </div>}
      <Footer />
    </div>
  );
}

export default App;
