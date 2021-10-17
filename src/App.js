import './App.css';
import MainApp from './components/mainApp/MainApp';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';

const theme = createTheme({
	palette: {
		primary: cyan,
		secondary: {
			main: '#ffc107',
		},
		// text: {
		// 	primary: '#fff',
		// 	secondary: '#fff',
		// },
	},
	overrides: {
		// Name of the component
		MuiInputBase: {
			// Name of the slot
			// root: {
			// 	border: '1px solid red',
			// },
			// validFocus: {
			// 	border: '3px solid red',
			// },
			typography: {
				// Some CSS
				color: '#fff',
				fontSize: '30px',
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
