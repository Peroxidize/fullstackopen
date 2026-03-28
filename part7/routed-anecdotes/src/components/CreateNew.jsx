import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import messageReducer from "../reducers/messageReducer";

const CreateNew = props => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const [message, messageDispatch] = useReducer(messageReducer, null);

  const handleSubmit = e => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });

    const msg = `a new anecdote ${content} created!`;

    messageDispatch({ type: "SET", payload: msg });

    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
