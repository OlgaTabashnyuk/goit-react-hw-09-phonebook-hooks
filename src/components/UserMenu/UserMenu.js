import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import defaultAvatar from './default-avatar.png';
import s from '../UserMenu/UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  const onLogout = useCallback(
    () => dispatch(authOperations.logOut()),
    [dispatch],
  );

  return (
    <div className={s.container}>
      <img src={defaultAvatar} alt="" width="25" className={s.avatar} />
      <span className={s.name}>
        Welcome, {name}{' '}
        {/* <span role="img" aria-label="Иконка приветствия">
        💁‍♀️
      </span> */}
      </span>
      <button type="button" onClick={onLogout} className={s.button}>
        Logout
      </button>
    </div>
  );
}
