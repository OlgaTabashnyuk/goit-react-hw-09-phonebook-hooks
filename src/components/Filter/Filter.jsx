// import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { contactsSelectors, changeFilter } from '../../redux/phonebook';

const filteredContactsId = shortid.generate();

export default function Filter() {
  const contacts = useSelector(contactsSelectors.getAllContacts);
  const dispatch = useDispatch();

  const onChange = e => dispatch(changeFilter(e.target.value));
  const value = useSelector(contactsSelectors.getFilter);

  return contacts.length > 0 ? (
    <label htmlFor={filteredContactsId} className={styles.label}>
      Find contact by name
      <input
        id={filteredContactsId}
        type="text"
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </label>
  ) : (
    <p className={styles.text}>The phonebook is empty</p>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
