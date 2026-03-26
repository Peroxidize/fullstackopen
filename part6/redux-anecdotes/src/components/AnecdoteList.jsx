import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    const filter = state.filter;
    return state.anecdotes.filter(anecdote =>
      anecdote.content.includes(filter)
    );
  });

  const vote = id => {
    console.log("vote", id);
    dispatch(increaseVote(id));
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
