import React, { useContext } from 'react';

import AuthContext from '../../../context/auth/authContext';
import ContactContext from '../../../context/contact/contactContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout, user } = authContext;

	const contactContext = useContext(ContactContext);
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		clearContacts();
	};

	const authLinks = (
		<>
			<li>Hello {user && user.name}</li>
			<li>
				<a href='#!'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm' onClick={onLogout}>
						Logout
					</span>
				</a>
			</li>
		</>
	);

	const guestLinks = (
		<>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</>
	);

	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={`m-1 ${icon}`} />
				{title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
};

export default Navbar;
