import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, fetchBlogs, showMessage }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = async id => {
    try {
      await blogService.increaseLikes(id);
      fetchBlogs();
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      const altMessage = "unable to increase likes";
      showMessage(errorMessage || altMessage, "error");
    }
  };

  const deleteBlog = async blog => {
    const string = `Remove blog ${blog.title} by ${blog.author}`;
    if (!window.confirm(string)) {
      return;
    }

    try {
      await blogService.deleteBlog(blog.id);
      showMessage("blog deleted", "success");
      fetchBlogs();
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      const altMessage = "unable to delete blog";
      showMessage(errorMessage || altMessage, "error");
    }
  };

  if (view) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={() => setView(!view)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => increaseLikes(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    );
  }

  return (
    <div style={blogStyle} data-testid="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setView(!view)}>view</button>
    </div>
  );
};

export default Blog;
