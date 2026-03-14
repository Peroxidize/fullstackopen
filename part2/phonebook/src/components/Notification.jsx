const Notification = ({ message, css, show }) => {
  if (message === null) {
    return null;
  }

  return (
    <>
      <div className={`notification invisible ${css} ${show}`}>{message}</div>
    </>
  );
};

export default Notification;
