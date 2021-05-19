import React, { useContext, useState } from 'react';

import ContactContext from '../../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	const { name, email, phone, type } = contact;

	const onChange = e => {
		const { name, value } = e.target;
		setContact({ ...contact, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		contactContext.addContact(contact);
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal',
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 className='text-primary'>Add Contact</h2>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
			/>
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
			/>
			Professional{' '}
			<div>
				<button type='submit' className='btn btn-primary btn-block'>
					Add Contact
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
