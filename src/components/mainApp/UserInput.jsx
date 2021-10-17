import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSubmit } from '../../hooks/useSubmit';

const UserInput = ({
	packs,
	handlePacks,
	price,
	handlePrice,
	quitDate,
	handleDate,
	calcData,
	errors,
	setErrors,
}) => {
	// const { packs, price, quitDate } = useSubmit(validate, calcData);

	// const validate = (e) => {
	// 	e.preventDefault();

	// };
	return (
		<Grid
			container
			className='input-container'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
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
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						onChange={handleDate}
						value={quitDate}
						format='MM/dd/yyyy'
						disableFuture={true}
						inputVariant='outlined'
						color='primary'
						inputProps={{
							maxwidth: '195px',
						}}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item>
				<Button
					className='subButton'
					variant='contained'
					onClick={calcData}
					color='primary'
					InputProps={{
						style: {
							marginTop: '1em',
						},
					}}
				>
					Calculate
				</Button>
			</Grid>
		</Grid>
	);
};

export default UserInput;
