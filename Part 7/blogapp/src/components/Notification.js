import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification.message);
  const info = useSelector(state => state.notification.info);
  if (!notification) {
    return;
  }

  const style = {
    backgroundColor: info.type === 'error' ? "rgb(218, 83, 85);" : 'rgb(12, 205, 144)',
    fontSize: 20,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    border: "none",
    borderRadius: 5,
    padding: "20px 10px",
    marginBottom: 10,
    color: "rgb(17, 17, 17)"
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;