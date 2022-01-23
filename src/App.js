import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/landingPage/Login';
import Register from './components/landingPage/Register';
import MainApp from './components/mainApp/MainApp';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { UserContext } from './context/UserContext';
import useAuth from './hooks/useAuth';

function App() {
	const { user, setUser, logout } = useAuth();

	return (
		<Router>
			<UserContext.Provider value={{ user, setUser, logout }}>
				<NavBar />
				<Switch>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/register'>
						<Register />
					</Route>
					<Route exact path='/'>
						<MainApp />
					</Route>
				</Switch>
				<Footer />
			</UserContext.Provider>
		</Router>
	);
}

export default App;
