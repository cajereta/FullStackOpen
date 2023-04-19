import PropTypes from "prop-types";

const LoginForm = ({ handleSubmit, handlePasswordChange, handleUsernameChange, username, password }) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ margin: "1rem 0 " }}>
        Username
        <input
          id="username"
          style={{ margin: "0rem 0.5rem ", padding: "5px" }}
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div style={{ margin: "1rem 0 " }}>
        Password
        <input
          id="password"
          style={{ margin: "0rem 0.5rem ", padding: "5px" }}
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;