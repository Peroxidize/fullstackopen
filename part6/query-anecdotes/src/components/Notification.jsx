import { useContext, useEffect, useRef } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const { notification, timerId, timerIdDispatch } =
    useContext(NotificationContext);
  const timerRef = useRef(null);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const timer = setTimeout(() => {
      timerRef.current = null;
      timerIdDispatch({ type: "NONE" });
    }, 5000);

    timerRef.current = timer;
  }, [timerId]);

  if (!timerId) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
