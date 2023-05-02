import "./BlogList.css";
import { Link } from "react-router-dom";


const BlogList = ({ blogs }) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes;
  return (
    <div className="table-container">
      <table className="main-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.sort(byLikes).map(blog => {
            return (
              <tr key={blog.id}>
                <td className="link-blog-list">
                  <Link
                    to={`blogs/${blog.id}`}

                  >{blog.title}
                  </Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div >
  );
};

export default BlogList

