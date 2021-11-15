import React, { useContext, useEffect } from 'react';
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
import { UserContext } from '../../hooks/UserContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
		padding: '1.5em 1em 1em 1em',
		margin: '1em 0 0 0',
		width: '300px',
	},
	button: {
		backgroundColor: theme.palette.secondary.dark,
		margin: '16px !important',
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

	const daysQuit = differenceInCalendarDays(date, formData.quitDate);

	const calcSavings = () => {
		const amount = parseFloat(formData.packs);
		const cost = parseFloat(formData.price);
		const moneySaved = amount * cost * daysQuit;

		setCalculations({ savings: moneySaved.toFixed(2) });
	};

	const onSubmit = (data) => {
		console.log(data);
		if (!user) {
			setFormData({
				packs: data.packs,
				price: data.price,
				quitDate: new Date(data.quitDate),
			});
			console.log(data);
		} else if (user) {
			if (JSON.stringify(data) === JSON.stringify(formData)) {
				console.log('No changes');
				return;
			}
			fetch('/form/save_input', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			})
				.then((responce) => responce.json())
				.then((data) => {
					if (data.error) {
						console.log('Server error saving data: ' + data.error);
						//Display error
					}
					if (data.msg === 'Success') {
						console.log('data saved');
						calcSavings();
						setFormData({
							packs: formData.packs,
							price: formData.price,
							quitDate: formData.quitDate,
						});
					}
				})
				.catch((err) => {
					console.log('Error saving data: ' + err);
				});
		}
	};

	useEffect(() => {
		if (formData.packs !== '') {
			reset(formData);
			calcSavings();
			console.log('useEffect ran');
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
				</Grid>
			</Paper>
		</Grid>
	);
};

export default UserInput;
