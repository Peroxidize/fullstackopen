import { createSlice } from "@reduxjs/toolkit";

const generateId = () => {
    return Math.floor(Math.random() * 1000000);
};

const initialState = {
    message: "",
    timerId: generateId(),
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotification(state, action) {
            return { message: action.payload, timerId: generateId() };
        },
    },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
