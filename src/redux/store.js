import { configureStore } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';

const contactsName = createAction('myContacts/name');

const reducer = createReducer('', {
  [contactsName]: (state, action) => [...state, ...action],
});

export const store = configureStore({
  reducer: {
    myValue: reducer,
  },
});
