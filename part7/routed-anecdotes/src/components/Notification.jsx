import { useReducer, useEffect } from "react";
import messageReducer from "../reducers/messageReducer";

const Notification = () => {
  const [message, messageDispatch] = useReducer(messageReducer, null);

  useEffect(() => {
    setTimeout(() => {
      messageDispatch({ type: "NONE" });
    }, 5000);
  }, []);

  if (!message) {
    return null;
  }

  return <p>{message}</p>;
};

export default Notification;
