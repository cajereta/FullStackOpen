
const Notification = ({ message, type }) => {
  let color;
  type === "red" ? color = "rgba(255, 58, 58, 0.74)" : color = "rgba(196, 249, 153, 0.8)";
  const style = {
    backgroundColor: color,
    padding: "3px",
    borderRadius: "5px",
    fontStyle: 'italic',
    fontSize: 20,
    width: "60%",
    marginTop: "10px",

  };


  const renderedNotification = message ? <div style={style} ><p >{message}</p></div> : "";

  return (
    <>
      {renderedNotification}
    </>
  );
};

export default Notification;