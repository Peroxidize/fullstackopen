import { useEffect } from "react";

const Notification = ({ message, messageDispatch }) => {
  useEffect(() => {
    setTimeout(() => {
      messageDispatch({ type: "NONE" });
    }, 5000);
  }, [message]);

  if (!message) {
    return null;
  }

  return <p>{message}</p>;
};

export default Notification;
