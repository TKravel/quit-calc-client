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
		MuiInputBase: {
			// Name of the slot
			root: {
				color: blue[50],
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
