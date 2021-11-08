import React from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm, Controller } from 'react-hook-form';

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

const onSubmit = (data) => {
	console.log(data);
};

const UserInput = ({
	packs,
	handlePacks,
	price,
	handlePrice,
	quitDate,
	handleDate,
	calcData,
	errors,
}) => {
	const classes = useStyles();
	const { control, handleSubmit } = useForm();
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
						defaultValue=''
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
								// color='secondary'
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
					<TextField
						placeholder='$00.00'
						onChange={handlePrice}
						value={price}
						id='price-input'
						variant='outlined'
						label='Price per pack'
						autoComplete='off'
						// color='secondary'
						inputProps={{
							inputMode: 'decimal',
							pattern: '[0-9]+(.[0-9]{2})',
						}}
						error={errors.price ? true : false}
						helperText={errors.priceMsg ? errors.priceMsg : null}
					/>
				</Grid>
				<Grid item>
					<MuiPickersUtilsProvider
						utils={DateFnsUtils}
						id='date-picker'
					>
						<KeyboardDatePicker
							onChange={handleDate}
							value={quitDate}
							format='MM/dd/yyyy'
							disableFuture={true}
							inputVariant='outlined'
							// color='secondary'
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
