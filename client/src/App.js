import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './pages/About';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import React from 'react';
import Register from './components/auth/Register';

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<Router>
					<>
						<Navbar />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route
									exact
									path='/register'
									component={Register}
								/>
								<Route exact path='/login' component={Login} />
							</Switch>
						</div>
					</>
				</Router>
			</ContactState>
		</AuthState>
	);
};

export default App;
