import { createContext, useReducer } from "react";

const generateRandom = () => {
  return Math.floor(Math.random() * 100000);
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const timerIdReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return generateRandom();
    case "NONE":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  const [timerId, timerIdDispatch] = useReducer(timerIdReducer, null);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        timerId,
        timerIdDispatch,
        notificationDispatch,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
