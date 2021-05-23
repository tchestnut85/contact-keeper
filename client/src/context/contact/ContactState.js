import {
	ADD_CONTACT,
	CLEAR_CONTACTS,
	CLEAR_CURRENT,
	CONTACT_ERROR,
	DELETE_CONTACT,
	FILTER_CONTACTS,
	GET_CONTACTS,
	SET_CURRENT,
	UPDATE_CONTACT,
} from '../actions';
import React, { useReducer } from 'react';

import ContactContext from './contactContext';
import axios from 'axios';
import contactReducer from './contactReducer';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Get contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');

			dispatch({
				type: GET_CONTACTS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.message,
			});
		}
	};

	// Add contact
	const addContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.message,
			});
		}
	};

	// Delete contact
	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({
				type: DELETE_CONTACT,
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.message,
			});
		}
	};

	const clearContacts = () => {
		dispatch({
			type: CLEAR_CONTACTS,
		});
	};

	// Set current contact
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Update contact
	const updateContact = contact => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	// Filter contacts
	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// Clear filter
	const clearFilter = text => {
		dispatch({ type: FILTER_CONTACTS });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				clearContacts,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
