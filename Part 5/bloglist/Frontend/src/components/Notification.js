const Notification = ({ message, type }) => {
  const styles = {
    common: {
      width: "60%",
      padding: "0.75em",
      backgroundColor: type === "red" ? "rgba(255, 0, 32, 0.66)" : (type === "green") ? "rgba(0, 255, 37, 0.32)" : "",
      borderRadius: "5px",
    },
    // Error: {

    // },
    // NotError: {
    //   backgroundColor: "rgba(0, 255, 37, 0.32)",
    // }
  };
  return (
    <>
      <h3 style={styles.common}>{message}</h3>
    </>);

};

export default Notification;