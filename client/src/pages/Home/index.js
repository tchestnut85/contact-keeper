import Contacts from '../../components/contacts/Contacts';
import React from 'react';

const Home = () => {
	return (
		<main className='grid-2'>
			<div>{/* contact form */}</div>
			<div>
				<Contacts />
			</div>
		</main>
	);
};

export default Home;
