import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState,
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload);
        },
        increaseVote(state, action) {
            const newAnecdote = action.payload;
            const newState = state.map(anecdote =>
                anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
            );

            return newState.sort((a, b) => b.votes - a.votes);
        },
        setAnecdotes(state, action) {
            return action.payload.sort((a, b) => b.votes - a.votes);
        },
    },
});

const { setAnecdotes, createAnecdote, increaseVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const newAnecdote = anecdote => {
    return async dispatch => {
        const result = await anecdoteService.createAnecdote(anecdote);
        dispatch(createAnecdote(result));
    };
};

export const growVote = anecdote => {
    return async dispatch => {
        const result = await anecdoteService.increaseVote(anecdote);
        dispatch(increaseVote(result));
    };
};

export default anecdoteSlice.reducer;
