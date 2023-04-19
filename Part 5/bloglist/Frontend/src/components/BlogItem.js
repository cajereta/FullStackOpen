import { useState } from "react";

const BlogItem = ({ title, author, url, likes, creator, updateLikes, id, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const stlyes = {
    border: "solid 1px red",
    borderRadius: "5px",
    padding: "5px 10px",
    marginBottom: "10px",
    width: "60%",
  };


  return (
    <div style={stlyes} className="blog">
      <p style={{ margin: "6px 0" }}> Title: {title} by {author}  <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details"}</button>
      </p>
      {showDetails ? <div className="children">
        <p style={{ margin: "6px 0" }}>Url: <a href={url}>{url}</a></p>
        <p style={{ margin: "6px 0" }}> Likes: {likes} <button onClick={() => updateLikes(id)}>Like</button></p>
        <p style={{ margin: "6px 0" }}>Posted by: {creator}</p>
        {creator === user.name && <button onClick={() => {
          if (window.confirm(`Remove blog ${title} by ${author}? `)) {
            deleteBlog(id);
          }
        }}>Delete</button>}
      </div> : ""}


    </div>
  );
};

export default BlogItem;