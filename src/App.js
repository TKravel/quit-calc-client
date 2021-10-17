import './App.css';
import MainApp from './components/mainApp/MainApp';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { cyan, deepPurple, blue } from '@material-ui/core/colors';

const theme = createTheme({
	palette: {
		primary: deepPurple,
		secondary: cyan,
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
				color: blue[50],
				backgroundColor: '#2b2929',
			},
		},
		MuiInputLabel: {
			root: {
				color: blue[50],
			},
		},
		MuiSvgIcon: {
			root: {
				color: cyan[300],
			},
		},
		MuiPaper: {
			root: {
				color: cyan[300],
				backgroundColor: '#080707',
				margin: '1em',
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
