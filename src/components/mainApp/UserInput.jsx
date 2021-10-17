import React from 'react';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
	return (
		<Grid
			container
			className='input-container'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<Paper elevation={8} component='form' className='form-container'>
				<Grid item xs={12}>
					<TextField
						value={packs}
						onChange={handlePacks}
						variant='outlined'
						margin='normal'
						step='0.5'
						label='Number of packs per day'
						autoComplete='off'
						color='primary'
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
						margin='normal'
						label='Price per pack'
						autoComplete='off'
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
							color='primary'
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item>
					<Button
						className='subButton'
						variant='contained'
						onClick={calcData}
						color='primary'
					>
						Calculate
					</Button>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default UserInput;
