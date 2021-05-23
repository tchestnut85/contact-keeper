import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import ContactFilter from '../../components/contacts/ContactFilter';
import ContactForm from '../../components/contacts/ContactForm';
import Contacts from '../../components/contacts/Contacts';

const Home = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();

		// eslint-disable-next-line
	}, []);

	return (
		<main className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts />
			</div>
		</main>
	);
};

export default Home;
