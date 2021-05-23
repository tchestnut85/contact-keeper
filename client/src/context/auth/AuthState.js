import {
	AUTH_ERROR,
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
} from '../actions';
import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

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
	const loadUser = async () => {
		if (localStorage.contactsAppToken) {
			setAuthToken(localStorage.contactsAppToken);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

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

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.message,
			});
		}
	};

	// Login user
	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.message,
			});
		}
	};

	// Logout user
	const logout = () => dispatch({ type: LOGOUT });

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
				loadUser,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
