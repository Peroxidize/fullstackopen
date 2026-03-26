import { createSlice } from "@reduxjs/toolkit";

const initialState = "Initial value for Notification";

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
});

//TODO create functions
export default notificationSlice.reducer;
