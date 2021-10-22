import {
	Button,
	Container,
	Paper,
	TextField,
	Typography,
	Grid,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		height: 'calc(100vh - 65px)',
		padding: '0px',
		justifyContent: 'center',
		alignItems: 'center',
	},
	gridContainer: {
		height: '60vh',
	},
	loginForm: {
		width: '90%',
		maxWidth: '250px',
		height: '70%',
		paddingTop: '1em',
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
	},
}));

const Login = () => {
	const classes = useStyles();
	return (
		<Container component='form' className={classes.container}>
			<Paper elevation={8} className={classes.loginForm}>
				<Grid
					container={true}
					direction='row'
					justifyContent='space-around'
					alignContent='center'
					spacing={2}
					className={classes.gridContainer}
				>
					<Grid item xs={12}>
						<Typography
							variant='h4'
							component='h1'
							gutterBottom={true}
						>
							Login
						</Typography>
						<Typography
							variant='body1'
							gutterBottom={true}
							paragraph
						>
							Not registered?
							<br />
							<Link to='/register'>Sign up here</Link>!
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							size='small'
							label='Username'
							placeholder='Username'
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							size='small'
							label='Password'
							placeholder='Password'
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button variant='contained' color='secondary'>
							Login
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Login;