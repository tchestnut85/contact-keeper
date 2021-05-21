import { CLEAR_ERRORS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions';
import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('contactsAppToken'),
		user: null,
		isAuthenticated: null,
		loading: true,
		error: null,
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load user

	// Register user
	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.message,
			});
		}
	};

	// Login user

	// Clear errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				register,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
