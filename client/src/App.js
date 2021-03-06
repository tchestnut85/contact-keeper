import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './pages/About';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';

if (localStorage.contactsAppToken) {
	setAuthToken(localStorage.contactsAppToken);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<>
							<Navbar />
							<div className='container'>
								<Alerts />
								<Switch>
									<PrivateRoute
										exact
										path='/'
										component={Home}
									/>
									<Route
										exact
										path='/about'
										component={About}
									/>
									<Route
										exact
										path='/register'
										component={Register}
									/>
									<Route
										exact
										path='/login'
										component={Login}
									/>
								</Switch>
							</div>
						</>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
