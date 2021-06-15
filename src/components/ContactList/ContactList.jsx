// import PropTypes from 'prop-types';
import { useCallback } from 'react';
import styles from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { default as contactsOperations } from '../../redux/phonebook/phonebook-operations';
import { default as contactsSelectors } from '../../redux/phonebook/phonebook-selectors';

const s = {
  contacts: {
    marginLeft: '200px',
  },
};

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  const onDeleteContact = useCallback(
    id => dispatch(contactsOperations.deleteContact(id)),
    [dispatch],
  );

  return (
    <ul className={styles.ContactList}>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.ContactList__item} key={id}>
          <div className={styles.itemDetailsContainer}>
            <p className={styles.ContactsDetails}>{name}</p>
            <p className={styles.ContactsDetails}>{number}</p>
            <button
              className={styles.ContactList__btn}
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
