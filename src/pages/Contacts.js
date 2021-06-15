import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactEditor from '../components/ContactEditor';
import ContactsList from '../components/ContactList';
import Filter from '../components/Filter';
import { contactsOperations } from '../redux/phonebook';
import s from './Register.module.css';

export default function Contacts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactEditor />
      <h2 className={s.contactsTitle}>Contacts</h2>
      <Filter />
      <ContactsList />
    </>
  );
}
