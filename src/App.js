import './App.css';
import MainApp from './components/mainApp/MainApp';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { cyan, blue } from '@material-ui/core/colors';

const theme = createTheme({
	palette: {
		primary: {
			light: '#8e8e8e',
			main: '#616161',
			dark: '#373737',
		},
		secondary: {
			light: '#73e8ff',
			main: '#29b6f6',
			dark: '#0086c3',
		},
		error: {
			main: '#d10000',
		},
	},
	text: {
		primary: blue[50],
		secondary: blue[50],
	},

	overrides: {
		// Name of the component
		MuiFormControl: {
			root: {
				maxWidth: '80%',
			},
		},
		MuiInputBase: {
			// Name of the slot
			root: {
				backgroundColor: '#8e8e8e',
				marginTop: '0.5em',
				marginBottom: '0.5em',
			},
		},
		MuiInputLabel: {
			root: {
				color: 'secondary',
			},
		},
		MuiSvgIcon: {
			root: {
				color: cyan[300],
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<MainApp />
		</ThemeProvider>
	);
}

export default App;
