import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from './ContactEditor.module.css';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';

export default function ContactEditor() {
  const [user, setUser] = useState({ name: '', number: '' });
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getAllContacts);

  const handleChange = ({ target: { name, value } }) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      if (contacts.find(el => el.name === user.name)) {
        alert(`Name ${user.name} is already in phonebook`);

        return;
      }
      dispatch(contactsOperations.addContact(user));
      setUser({ name: '', number: '' });
    },
    [dispatch, user, contacts],
  );

  return (
    <div className={s.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor={shortid.generate()}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            id={shortid.generate()}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>

        <label htmlFor={shortid.generate()}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            value={user.number}
            onChange={handleChange}
            id={shortid.generate()}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add to contacts
        </button>
      </form>
    </div>
  );
}

// export default function ContactEditor() {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const dispatch = useDispatch();
//   const contacts = useSelector(contactsSelectors.getAllContacts);

//   const nameInputId = () => shortid.generate();
//   const numberInputId = () => shortid.generate();

//   const handleChangeName = e => {
//     setName(e.target.value);
//   };

//   const handleChangeNumber = e => {
//     setNumber(e.target.value);
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (contacts.find(el => el.name === name)) {
//       alert(`Name ${name} is already in phonebook`);
//       reset();
//       return;
//     }
//     dispatch(contactsOperations.addContact({ name, number }));
//     reset();
//   };
//   const reset = () => {
//     setName('');
//     setNumber('');
//   };
//   console.log(shortid.generate());

//   return (
//     <div className={s.form}>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor={nameInputId}>
//           Name
//           <input
//             className={s.input}
//             type="text"
//             name="name"
//             value={name}
//             onChange={handleChangeName}
//             id={nameInputId}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
//             required
//           />
//         </label>

//         <label htmlFor={numberInputId}>
//           Number
//           <input
//             className={s.input}
//             type="tel"
//             name="number"
//             value={number}
//             onChange={handleChangeNumber}
//             id={numberInputId}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
//             required
//           />
//         </label>
//         <button className={s.button} type="submit">
//           Add to contacts
//         </button>
//       </form>
//     </div>
//   );
// }

ContactEditor.propTypes = {
  onSubmit: PropTypes.func,
};
