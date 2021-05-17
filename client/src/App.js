import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Navbar from './components/layout/Navbar';
import React from 'react';

const App = () => {
	return (
		<Router>
			<>
				<Navbar />
				<div className='container'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/about' component={About} />
					</Switch>
				</div>
			</>
		</Router>
	);
};

export default App;
