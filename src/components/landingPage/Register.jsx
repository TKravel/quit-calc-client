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
	const { control, handleSubmit } = useForm();
	const classes = useStyles();

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<Container
			component='form'
			className={classes.container}
			onSubmit={handleSubmit(onSubmit)}
		>
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
							name='email'
							control={control}
							defaultValue=''
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<TextField
									type='email'
									variant='outlined'
									size='small'
									label='Email'
									placeholder='Email'
									name='email'
									value={value}
									onChange={onChange}
									error={error ? true : false}
									helperText={error ? error.message : null}
								></TextField>
							)}
							rules={{
								required: 'Email required',
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
									name='password'
									variant='outlined'
									size='small'
									label='Create a password'
									placeholder='Password'
									value={value}
									onChange={onChange}
									error={error ? true : false}
									helperText={error ? error.message : null}
								></TextField>
							)}
							rules={{
								required: 'Password required',
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							type='submit'
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
