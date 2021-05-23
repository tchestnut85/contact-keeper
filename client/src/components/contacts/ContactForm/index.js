import React, { useContext, useEffect, useState } from 'react';

import ContactContext from '../../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const { addContact, current, clearCurrent, updateContact } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
	}, [contactContext, current]);

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

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}

		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 className='text-primary'>
				{current ? 'Update Contact' : 'Add Contact'}
			</h2>
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
				onChange={onChange}
			/>{' '}
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			Professional{' '}
			<div>
				<button type='submit' className='btn btn-primary btn-block'>
					{current ? 'Update Contact' : 'Add Contact'}
				</button>
			</div>
			{current && (
				<div>
					{' '}
					<button
						className='btn btn-light btn-block my-2'
						onClick={clearAll}
					>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
