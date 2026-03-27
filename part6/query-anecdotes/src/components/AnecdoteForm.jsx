import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { createAnecdote } from "../services/anecdote";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const { notificationDispatch, timerIdDispatch } =
    useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate(content);
    const message = `anecdote '${content}' created`;
    notificationDispatch({ type: "SET", payload: message });
    timerIdDispatch({ type: "SET" });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
