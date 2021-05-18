import {
	ADD_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	DELETE_CONTACT,
	FILTER_CONTACTS,
	SET_CURRENT,
	UPDATE_CONTACT,
} from '../actions';
import React, { useReducer } from 'react';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import uuid from 'uuid';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Some Body',
				email: 'some@mail.com',
				phone: '123-456-7890',
				type: 'personal',
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

	// Delete contact

	// Set current contact

	// Clear current contact

	// Update contact

	// Filter contacts

	// Clear filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
