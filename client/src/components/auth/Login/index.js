import React, { useState } from 'react';

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('Login Submitted');
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
				</div>

				<button type='submit' className='btn btn-primary btn-block'>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
