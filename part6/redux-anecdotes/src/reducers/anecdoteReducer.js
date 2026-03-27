import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initialState = [];

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState,
    reducers: {
        createAnecdote(state, action) {
            state.push(asObject(action.payload));
        },
        increaseVote(state, action) {
            const id = action.payload;
            const anecdoteToChange = state.find(anecdote => anecdote.id === id);
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1,
            };
            const newState = state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            );

            return newState.sort((a, b) => b.votes - a.votes);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { createAnecdote, increaseVote, setAnecdotes } =
    anecdoteSlice.actions;
export default anecdoteSlice.reducer;
