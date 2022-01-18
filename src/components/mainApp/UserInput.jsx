import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller } from 'react-hook-form';
import { CalcDataContext } from '../../context/CalcDataContext';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
		padding: '1.5em 1em 1em 1em',
		margin: '1em 0 1em 0',
		width: '300px',
	},
	button: {
		backgroundColor: theme.palette.secondary,
		margin: '16px !important',
	},
	error: {
		color: theme.palette.error.main,
	},
}));

const date = new Date();

const UserInput = () => {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { formData, setFormData, setCalculations } =
		useContext(CalcDataContext);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			packs: '',
			price: '',
			quitDate: date,
		},
	});
	const [errors, setErrors] = useState('');

	const daysQuit = differenceInCalendarDays(date, formData.quitDate);

	const calcSavings = () => {
		const amount = parseFloat(formData.packs);
		const cost = parseFloat(formData.price);
		const moneySaved = amount * cost * daysQuit;

		setCalculations({ savings: moneySaved.toFixed(2) });
	};

	const onSubmit = (userData) => {
		if (errors !== '') {
			setErrors('');
		}
		if (!user) {
			console.log('no user');
			setFormData({
				packs: userData.packs,
				price: userData.price,
				quitDate: new Date(userData.quitDate),
			});
		} else if (user) {
			console.log('user found');
			if (JSON.stringify(userData) === JSON.stringify(formData)) {
				console.log('user data the same');
				return;
			}
			fetch(`${REACT_APP_SERVER}/form/save_input`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				credentials: 'include',
				body: JSON.stringify(userData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						console.log('Server error saving data: ' + data.error);
						setErrors(data.error);
					}
					if (data.msg === 'Success') {
						setFormData({
							packs: userData.packs,
							price: userData.price,
							quitDate: userData.quitDate,
						});
						calcSavings();
					}
				})
				.catch((err) => {
					console.log('Error saving data: ' + err);
					setErrors('Server error, Please try again later.');
				});
		}
	};

	useEffect(() => {
		if (formData.packs !== '') {
			reset(formData);
			calcSavings();
		}
	}, [formData]);

	return (
		<Grid
			container
			className='input-container'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<Paper
				elevation={8}
				component='form'
				className={classes.paper}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Typography variant='h5' component='h2' gutterBottom={true}>
					Let's get some info!
				</Typography>
				<Typography variant='body1' paragraph>
					Enter the bellow information along with the date you quit
					then click calculate to see your progress.
				</Typography>
				<Grid item xs={12}>
					<Controller
						name='packs'
						control={control}
						render={({
							field: { onChange, value },
							fieldState: { error },
						}) => (
							<TextField
								value={value}
								onChange={onChange}
								variant='outlined'
								label='Number of packs per day'
								autoComplete='off'
								inputProps={{
									inputMode: 'decimal',
									pattern: '^[0-9]\\d*(\\.\\d+)?$',
								}}
								error={error ? true : false}
								helperText={error ? error.message : null}
							/>
						)}
						rules={{
							required: 'Required',
							pattern: '^[0-9]\\d*(\\.\\d+)?$',
						}}
					/>
				</Grid>
				<Grid item>
					<Controller
						name='price'
						control={control}
						render={({
							field: { onChange, value },
							fieldState: { error },
						}) => (
							<TextField
								placeholder='$00.00'
								onChange={onChange}
								value={value}
								id='price-input'
								variant='outlined'
								label='Price per pack'
								autoComplete='off'
								inputProps={{
									inputMode: 'decimal',
									pattern: '[0-9]+(.[0-9]{2})',
								}}
								error={error ? true : false}
								helperText={error && error.message}
							/>
						)}
						rules={{
							required: 'Required',
							pattern: '^[0-9]\\d*(\\.\\d+)?$',
						}}
					/>
				</Grid>
				<Grid item>
					<MuiPickersUtilsProvider
						utils={DateFnsUtils}
						id='date-picker'
					>
						<Controller
							name='quitDate'
							control={control}
							render={({ field: { onChange, value } }) => (
								<KeyboardDatePicker
									onChange={onChange}
									value={value}
									format='MM/dd/yyyy'
									disableFuture={true}
									inputVariant='outlined'
								/>
							)}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item>
					<Button
						id='subButton'
						className={classes.button}
						variant='contained'
						type='submit'
						color='secondary'
					>
						Calculate
					</Button>
					<Typography
						className={classes.error}
						variant='body1'
						paragraph
					>
						{errors && errors}
					</Typography>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default UserInput;
