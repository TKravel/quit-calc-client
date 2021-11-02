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
import { useForm, Controller } from 'react-hook-form';

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
	const { control, handleSubmit } = useForm();
	const classes = useStyles();

	const onSubmit = (data) => {
		console.log(data);
		fetch('http://localhost:3000', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then((responce) => responce.json())
			.then((result) => {
				if (result.msg === 'success') {
					// Set user
				} else {
					// Display error
				}
			});
	};
	return (
		<Container
			component='form'
			className={classes.container}
			onSubmit={handleSubmit(onSubmit)}
		>
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
						<Controller
							name='username'
							control={control}
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<TextField
									variant='outlined'
									size='small'
									label='Username'
									placeholder='Username'
									name='username'
									value={value}
									onChange={onChange}
									error={error ? true : false}
									helperText={error ? error.message : null}
								></TextField>
							)}
							rules={{
								required: 'Username required',
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name='password'
							control={control}
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<TextField
									variant='outlined'
									size='small'
									label='Password'
									placeholder='Password'
									name='password'
									value={value}
									onChange={onChange}
									error={error ? true : false}
									helperText={error ? error.message : null}
								></TextField>
							)}
							rules={{
								required: 'Password required',
								minLength: { value: 6, message: 'to short' },
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='secondary'
							type='submit'
						>
							Login
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Login;
