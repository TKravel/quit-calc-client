import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/landingPage/Login';
import Register from './components/landingPage/Register';
import MainApp from './components/mainApp/MainApp';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { UserContext } from './context/UserContext';
import useAuth from './hooks/useAuth';

const theme = createTheme({
	palette: {
		primary: {
			extraLight: '#cccccc',
			light: '#8e8e8e',
			main: '#616161',
			dark: '#373737',
			extraDark: '#171717',
		},
		secondary: {
			light: '#73e8ff',
			main: '#29b6f6',
			dark: '#0086c3',
			extraDark: '#00364f',
		},
		error: {
			main: '#d10000',
		},
	},

	overrides: {
		MuiFormControl: {
			root: {
				maxWidth: '80%',
			},
		},
		MuiInputBase: {
			root: {
				backgroundColor: '#cccccc',
				marginTop: '0em',
				marginBottom: '1em',
			},
		},
		MuiInputLabel: {
			root: {
				color: '#000',
			},
		},
		MuiFormLabel: {
			root: {
				color: '#000',
			},
		},
		MuiOutlinedInput: {
			root: {
				color: '#000',
			},
		},
		MuiSvgIcon: {
			root: {
				color: '#00364f',
			},
		},
		MuiFormHelperText: {
			marginDense: {
				marginTop: '0px',
			},
		},
	},
});

function App() {
	const { user, setUser, logout } = useAuth();

	return (
		<Router>
			<UserContext.Provider value={{ user, setUser, logout }}>
				<ThemeProvider theme={theme}>
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
				</ThemeProvider>
			</UserContext.Provider>
		</Router>
	);
}

export default App;
