import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  return (
    <>
      {!user && <Login setUser={setUser} />}
      {user && (
        <div>
          <h2>blogs</h2>
          {blogs.map(blog => {
            const username = blog.user.username;

            if (username !== user.username) {
              return null;
            }

            return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </>
  );
};

export default App;
