import { ADD_CONTACT, DELETE_CONTACT } from '../actions';
import React, { useReducer } from 'react';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { v4 as uuidv4 } from 'uuid';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Some Body',
				email: 'some@mail.com',
				phone: '123-456-7890',
				type: 'professional',
			},
			{
				type: 'personal',
				id: '2',
				name: 'Epona',
				email: 'epona@hyrule.com',
				phone: '222-222-2222',
			},
			{
				id: 3,
				type: 'personal',
				name: 'Tingle',
				email: 'tingle@hyrule.com',
				phone: '666-666-6666',
			},
		],
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Add contact
	const addContact = contact => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// Delete contact
	const deleteContact = id => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// Set current contact

	// Clear current contact

	// Update contact

	// Filter contacts

	// Clear filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
				deleteContact,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
