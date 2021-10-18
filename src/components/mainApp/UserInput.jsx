import React from 'react';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.main,
		textAlign: 'center',
		margin: '1em',
	},
	button: {
		backgroundColor: theme.palette.secondary.dark,
		margin: '16px !important',
	},
}));

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
	return (
		<Grid
			container
			className='input-container'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<Paper elevation={8} component='form' className={classes.paper}>
				<p>Let's get some info!</p>
				<Grid item xs={12}>
					<TextField
						value={packs}
						onChange={handlePacks}
						variant='outlined'
						step='0.5'
						label='Number of packs per day'
						autoComplete='off'
						color='secondary'
						inputProps={{
							inputMode: 'decimal',
							pattern: '[0-9]+(.[0-9]{2})',
						}}
						error={errors.packs ? true : false}
						helperText={errors.packsMsg ? errors.packsMsg : null}
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
						color='secondary'
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
							color='secondary'
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item>
					<Button
						id='subButton'
						className={classes.button}
						variant='contained'
						onClick={calcData}
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
