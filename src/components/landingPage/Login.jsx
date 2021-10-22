import {
	Button,
	Container,
	Paper,
	TextField,
	Typography,
	Grid,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	loginForm: {
		width: '90%',
		maxWidth: '360px',
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
	},
}));

const Login = () => {
	const classes = useStyles();
	return (
		<Container component='form'>
			<Grid container direction='column'>
				<Paper elevation={8} className={classes.loginForm}>
					<Grid item xs={12}>
						<Typography variant='h4' component='h1'>
							Login
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							label='Username'
							placeholder='Username'
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							label='Password'
							placeholder='Password'
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button variant='contained' color='secondary'>
							Login
						</Button>
					</Grid>
				</Paper>
			</Grid>
		</Container>
	);
};

export default Login;
