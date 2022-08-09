import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from 'redux/store';
import Form from './components/Form';
import Contacts from 'components/Contacts';
import Filter from 'components/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const dispatch = useDispatch();
  const contactsItem = useSelector(state => state.items);
  console.log(contactsItem);
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const newName = contacts.map(el => el.name.toLowerCase());
    if (newName.includes(data.name.toLowerCase())) {
      return alert(`${data.name} is already in contacts`);
    }
    const input = { id: nanoid(3), name: data.name, number: data.number };
    setContacts(prevState => [...prevState, input]);
  };

  const onFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const onCheck = () => {
    if (filter) {
      return contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };

  const onDeleteContact = id => {
    const contactName = contacts.filter(el => el.id !== id);
    setContacts(contactName);
  };

  const filteredContacts = onCheck();

  return (
    <div
      style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        padding: 50,
      }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <Filter filter={filter} onChange={onFilter} />
      <h2>Contacts</h2>
      <Contacts contacts={filteredContacts} deleteContact={onDeleteContact} />
      <button type="button" onClick={() => dispatch(add(contacts))}>
        TO STATE
      </button>
      <button type="button" onClick={() => dispatch(remove(contacts.id))}>
        FILTER
      </button>
    </div>
  );
};
