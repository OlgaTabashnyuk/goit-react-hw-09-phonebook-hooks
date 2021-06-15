import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import s from './Register.module.css';

export default function Register() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = useCallback(({ target: { name, value } }) => {
    setNewUser(prev => ({ ...prev, [name]: value }));
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      dispatch(authOperations.register(newUser));
      setNewUser({ name: '', email: '', password: '' });
    },
    [newUser, dispatch],
  );

  return (
    <div className={s.login}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleChange}
            className={s.input}
          />
        </label>

        <label className={s.label}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            className={s.input}
          />
        </label>

        <label className={s.label}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
            className={s.input}
          />
        </label>

        <button type="submit" className={s.button}>
          Register
        </button>
      </form>
    </div>
  );
}
