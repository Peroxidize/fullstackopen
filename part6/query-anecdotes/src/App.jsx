import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, voteAnecdote } from "./services/anecdote";
import NotificationContext from "./NotificationContext";

const App = () => {
  const { notificationDispatch, timerIdDispatch } =
    useContext(NotificationContext);
  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const newAnecdotes = anecdotes.map(anecdote =>
        anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
      );
      queryClient.setQueryData(["anecdotes"], newAnecdotes);
    },
  });

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });

  const handleVote = anecdote => {
    console.log("vote");
    voteAnecdoteMutation.mutate(anecdote);
    const message = `anecdote '${anecdote.content}' voted`;
    notificationDispatch({ type: "SET", payload: message });
    timerIdDispatch({ type: "SET" });
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
