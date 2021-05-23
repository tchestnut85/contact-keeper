import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { useContext, useEffect } from 'react';

import ContactContext from '../../../context/contact/contactContext';
import ContactItem from '../ContactItem';
import Spinner from '../../layout/Spinner';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, getContacts, loading, filtered } = contactContext;

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>No contacts. Add one!</h4>;
	}

	return (
		<>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map(contact => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames='item'
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map(contact => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames='item'
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default Contacts;
