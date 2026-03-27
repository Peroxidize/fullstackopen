import { useSelector, useDispatch } from "react-redux";
import { growVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    const filter = state.filter;
    return state.anecdotes.filter(anecdote =>
      anecdote.content.includes(filter)
    );
  });

  const vote = oldAnecdote => {
    dispatch(growVote(oldAnecdote));
    const anecdote = anecdotes.find(anecdote => anecdote.id === oldAnecdote.id);
    const message = `You voted, '${anecdote.content}'`;
    dispatch(setNotification(message));
  };

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
