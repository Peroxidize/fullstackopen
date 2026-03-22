import { useState } from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
          likes {blog.likes} <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setView(!view)}>view</button>
    </div>
  );
};

export default Blog;
