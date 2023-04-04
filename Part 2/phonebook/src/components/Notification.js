
const Notification = ({ message, type }) => {
  console.log(message, type);
  const style = {
    backgroundColor: "rgba(196, 249, 153, 0.8)",
    padding: "3px",
    borderRadius: "5px",
    fontStyle: 'italic',
    fontSize: 20,
    width: "60%",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto"
  };


  const renderedNotification = message ? <div style={style}><p >{message}</p></div> : "";

  return (
    <>
      {renderedNotification}
    </>
  );
};

export default Notification;