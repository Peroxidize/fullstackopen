import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    const filter = state.filter;
    return state.anecdotes.filter(anecdote =>
      anecdote.content.includes(filter)
    );
  });

  const vote = id => {
    console.log(anecdotes);
    dispatch(increaseVote(id));
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
