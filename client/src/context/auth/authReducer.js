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

const authReducer = (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case REGISTER_SUCCESS:
			localStorage.setItem('contactsAppToken', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case AUTH_ERROR:
		case REGISTER_FAIL:
			localStorage.removeItem('contactsAppToken');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export default authReducer;
