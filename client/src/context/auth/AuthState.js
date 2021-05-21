import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions';
import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';

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

	// Register use

	// Login user

	// Clear errors

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
