import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return <div style={style}>{notifications}</div>;
};

export default Notification;
