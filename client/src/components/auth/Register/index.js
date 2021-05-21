import React, { useContext, useState } from 'react';

import AlertContext from '../../../context/alert/alertContext';

const Register = () => {
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = user;

	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			console.log('Submitted');
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
						required
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Password</label>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={handleChange}
						required
						minLength='6'
					/>
				</div>
				<button type='submit' className='btn btn-primary btn-block'>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
