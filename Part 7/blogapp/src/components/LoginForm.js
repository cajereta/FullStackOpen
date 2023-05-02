import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loggedUser } from "../reducers/userReducer";
import "./LoginForm.css";

const LoginForm = ({ login }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
    dispatch(loggedUser(username, password));
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <label>Username</label>
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          id='password'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;