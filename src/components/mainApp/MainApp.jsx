import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { differenceInCalendarDays } from 'date-fns';
import '../../index.css';
import { makeStyles, styled } from '@material-ui/core';

const useStyles = makeStyles({});

const Inputs = styled(TextField)({
	// '& input:valid + fieldset': {
	// 	border: 'none',
	// 	borderWidth: 2,
	// },
	// '& input:invalid + fieldset': {
	// 	border: 'none',
	// 	borderWidth: 2,
	// },
	// '& input:valid:focus + fieldset': {
	// 	borderWidth: 3,
	// },
});

const DatePicker = styled(KeyboardDatePicker)({
	'& input:valid + fieldset': {
		borderColor: 'green',
		borderWidth: 2,
	},
	'& input:invalid + fieldset': {
		borderColor: 'red',
		borderWidth: 2,
	},
	'& input:valid:focus + fieldset': {
		borderWidth: 3,
	},
});

const MainApp = () => {
	const classes = useStyles();
	const date = new Date();
	const [packs, setPacks] = useState('');
	const [price, setPrice] = useState('');
	const [quitDate, setQuitDate] = useState(date);
	const [calculations, setCalculations] = useState({
		savings: 0,
	});
	const [errors, setErrors] = useState({
		packs: false,
		packsMsg: '',
		price: false,
		priceMsg: '',
	});
	let moneySaved = 0;
	let daysQuit = differenceInCalendarDays(date, quitDate);

	const handlePacks = (e) => {
		const userInput = e.target.value;
		console.log(userInput);
		if (isNaN(userInput)) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					packs: true,
					packsMsg: 'Only enter numbers',
				};
			});
			return;
		} else if (errors.packs) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					packs: false,
					packsMsg: '',
				};
			});
		}
		setPacks(userInput);
	};

	const handlePrice = (e) => {
		const userInput = e.target.value;
		if (isNaN(userInput)) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					price: true,
					priceMsg: 'Only enter numbers',
				};
			});
			return;
		} else if (errors.price) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					price: false,
					priceMsg: '',
				};
			});
		}
		setPrice(userInput);
	};

	// const handlePrice = (e) => {
	// 	e.preventDefault();
	// 	let userInput = e.target.value;
	// 	const arr = userInput.toString().split('');
	// 	console.log(arr);
	// 	if (arr[0] !== '0' && arr.length === 6) {
	// 		return;
	// 	}
	// 	if (arr[arr.length - 1] === '.') {
	// 		setErrors((prevValues) => {
	// 			return {
	// 				...prevValues,
	// 				price: true,
	// 				priceMsg: 'Only enter numbers',
	// 			};
	// 		});
	// 		return;
	// 	} else if (errors.price) {
	// 		setErrors((prevValues) => {
	// 			return {
	// 				...prevValues,
	// 				price: false,
	// 				priceMsg: '',
	// 			};
	// 		});
	// 	}
	// 	console.log(userInput.length);
	// 	if (arr.length === 6) {
	// 		console.log('6');
	// 		arr.shift();
	// 		const numbers = arr.filter((item) => item !== '.');
	// 		numbers.splice(2, 0, '.');
	// 		let result = numbers.join('');
	// 		return setPrice(parseFloat(result));
	// 	} else if (arr.length === 5) {
	// 		console.log('5');
	// 		arr.shift();
	// 		console.log(arr);
	// 		const numbers = arr.filter((item) => item !== '.');
	// 		numbers.splice(2, 0, '.');
	// 		let result = numbers.join('');
	// 		console.log('result ', result);
	// 		return setPrice(parseFloat(result));
	// 	} else if (arr.length < 4) {
	// 		console.log('<5');
	// 		const diff = 4 - arr.length;
	// 		for (let i = 0; i < diff; i++) {
	// 			console.log('shifted');
	// 			arr.unshift('0');
	// 		}
	// 		// if (arr.length > 5) {
	// 		// 	console.log('>5');
	// 		// 	arr.pop();
	// 		// }
	// 		const numbers = arr.filter((item) => item !== '.');
	// 		numbers.splice(2, 0, '.');
	// 		let result = numbers.join('');
	// 		console.log(result);
	// 		return setPrice(parseFloat(result));
	// 	}
	// };

	const handleDate = (value) => {
		setQuitDate(value);
		console.log(value, quitDate);
	};

	const calcData = (e) => {
		e.preventDefault();
		const amount = parseFloat(packs);
		const cost = parseFloat(price.substring(1));
		moneySaved = amount * cost * daysQuit;
		console.log('clicked', daysQuit, moneySaved, amount);
		setCalculations({ savings: moneySaved.toFixed(2) });
	};

	return (
		<div className='app-container'>
			<Grid
				container
				className='input-container'
				direction='row'
				justifyContent='center'
				alignItems='center'
			>
				<Grid
					container
					className='input-container'
					direction='column'
					justifyContent='center'
					alignItems='center'
					xs={6}
					md={1}
				>
					<form>
						<Grid item>
							<Inputs
								onChange={handlePacks}
								value={packs}
								variant='filled'
								margin='normal'
								step='0.5'
								label='Number of packs per day'
								inputProps={{
									inputMode: 'decimal',
									pattern: '[0-9]+(.[0-9]{2})',
								}}
								error={errors.packs ? true : false}
								helperText={
									errors.packsMsg ? errors.packsMsg : null
								}
							/>
						</Grid>
						<Grid item>
							<Inputs
								placeholder='$00.00'
								onChange={handlePrice}
								value={price}
								id='price-input'
								variant='filled'
								margin='normal'
								label='Price per pack'
								inputProps={{
									inputMode: 'decimal',
									pattern: '[0-9]+(.[0-9]{2})',
								}}
								error={errors.price ? true : false}
								helperText={
									errors.priceMsg ? errors.priceMsg : null
								}
							/>
						</Grid>
						<Grid item>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									onChange={handleDate}
									value={quitDate}
									format='MM/dd/yyyy'
									disableFuture={true}
									inputVariant='filled'
									// color='primary'
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								onClick={calcData}
								color='secondary'
							>
								Calculate
							</Button>
						</Grid>
					</form>
				</Grid>
				<Grid
					container
					className='input-container'
					direction='column'
					justifyContent='center'
					alignItems='center'
					sm={6}
					md={1}
				>
					<div className='savings-container'>
						Quiting for
						{daysQuit === 1
							? ` ${daysQuit} day`
							: ` ${daysQuit} days`}{' '}
						saved you ${calculations.savings}.
					</div>
				</Grid>
			</Grid>
			<div className='goal-container'>
				<p>goal 1: $100.00</p>
				<p>
					Progress:{' '}
					{parseFloat((calculations.savings / 100.0) * 100).toFixed(
						1
					) + '%'}
				</p>
				<p>Goal 2: $500</p>
				<p>
					Progress:{' '}
					{parseFloat((calculations.savings / 500.0) * 100).toFixed(
						1
					) + '%'}
				</p>
				<p>Goal 3: $1000</p>
				<p>
					Progress:{' '}
					{parseFloat((calculations.savings / 1000.0) * 100).toFixed(
						1
					) + '%'}
				</p>
			</div>
		</div>
	);
};

export default MainApp;
