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
	gridContainer: {},
	form: {
		width: '90%',
		maxWidth: '250px',

		paddingTop: '1em',
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
	},
	button: {
		backgroundColor: theme.palette.secondary.dark,
		marginBottom: '1em',
	},
}));

const Register = () => {
	const classes = useStyles();
	return (
		<Container component='form' className={classes.container}>
			<Paper elevation={8} className={classes.form}>
				<Grid
					container={true}
					direction='row'
					justifyContent='space-around'
					alignContent='center'
					className={classes.gridContainer}
				>
					<Grid item xs={12}>
						<Typography
							variant='h4'
							component='h1'
							gutterBottom={true}
						>
							Register
						</Typography>
						<Typography
							variant='body1'
							gutterBottom={true}
							paragraph
						>
							Have a account?
							<br />
							<Link to='/login'>Login here</Link>!
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
							label='Email'
							placeholder='Email'
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							size='small'
							label='Confirm Email'
							placeholder='Email'
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
						<TextField
							variant='outlined'
							size='small'
							label='Confirm password'
							placeholder='Password'
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='secondary'
							className={classes.button}
						>
							Login
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Register;
