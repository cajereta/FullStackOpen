import { useState } from "react";



const BlogForm = ({ createBlog, user }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogLikes, setBlogLikes] = useState(0);
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes,
      user: user
    });
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
    setBlogLikes("");
  };
  return (
    <>
      <h2>Add a new blog!</h2>
      <form onSubmit={addBlog} style={{ "display": "flex", "flexDirection": "column", "width": "60%" }}>
        Title <input
          id="title-blog"
          value={blogTitle}
          onChange={event => setBlogTitle(event.target.value)}
          minLength={5}
          required={true}
        />
        Author <input
          id="author-blog"
          value={blogAuthor}
          onChange={event => setBlogAuthor(event.target.value)}
        />
        Url <input
          id="url-blog"
          type="url"
          value={blogUrl}
          onChange={event => setBlogUrl(event.target.value)}
          required={true}
        />
        Likes <input
          id="likes-blog"
          type="number"
          min={0}
          value={blogLikes}
          onChange={event => setBlogLikes(event.target.value)}
        />
        <br style={{ "marginBottom": "20px" }} />
        <button id="submit-blog" type="submit">Save</button>
      </form>
      <br style={{ "marginBottom": "20px" }} />
      <br />

    </>
  );
};

export default BlogForm;