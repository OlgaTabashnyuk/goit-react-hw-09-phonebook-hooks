import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import s from './Register.module.css';

export default function LoginView() {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setUserLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(authOperations.logIn(userLogin));

    setUserLogin({ email: '', password: '' });
  };
  return (
    <div className={s.login}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <label className={s.label}>
          {/* Email */}
          <input
            type="email"
            name="email"
            value={userLogin.email}
            onChange={handleChange}
            placeholder="Email"
            className={s.input}
            required
          />
        </label>

        <label className={s.label}>
          {/* Password */}
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={handleChange}
            placeholder="Password"
            className={s.input}
            required
          />
        </label>

        <button type="submit" className={s.button}>
          Login
        </button>
      </form>
    </div>
  );
}
