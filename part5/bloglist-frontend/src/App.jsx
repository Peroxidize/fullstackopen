import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Create from "./components/Create";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  const onLogout = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.token = null;
  };

  const fetchBlogs = () => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  };

  return (
    <>
      {!user && <Login setUser={setUser} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={onLogout}>logout</button>
          </p>
          <Create fetchBlogs={fetchBlogs} />
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
