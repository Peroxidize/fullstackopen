import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import store from "../store";

const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector(state => state.notifications.message);
  const timerId = useSelector(state => state.notifications.timerId);
  const timerRef = useRef(null);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  useEffect(() => {
    console.log(store.getState());
    if (message === "") {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      dispatch(setNotification(""));
      timerRef.current = null;
    }, 5000);

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [message, timerId, dispatch]);

  if (message === "") {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
