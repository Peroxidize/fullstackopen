const messageReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "NONE":
            return null;
        default:
            return state;
    }
};

export default messageReducer;
