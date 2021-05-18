import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Navbar = ({ title, icon }) => {
	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={`m-1 ${icon}`} />
				{title}
			</h1>
			<ul>
				<li>
					<Link to='/'> Home</Link>
					<Link to='/about'>About</Link>
				</li>
			</ul>
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
