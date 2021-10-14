import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { differenceInCalendarDays } from 'date-fns';
import '../../index.css';

const MainApp = () => {
	const date = new Date();
	// let convertedPrice = convertedPrice.toLocalString('en-us');
	const [packs, setPacks] = useState(0);
	const [price, setPrice] = useState('$00.00');
	const [quitDate, setQuitDate] = useState(date);
	const [calculations, setCalculations] = useState({
		savings: 0,
	});
	let moneySaved = 0;
	let daysQuit = differenceInCalendarDays(date, quitDate);

	const handlePacks = (e) => {
		setPacks(e.target.value);
	};

	// const formatter = (num) => {
	// 	console.log(num);
	// 	let check = parseFloat(num);
	// 	console.log(typeof check, 'check');
	// 	if (typeof check === 'number') {
	// 		const result = new Intl.NumberFormat('en-US', {
	// 			style: 'currency',
	// 			currency: 'USD',
	// 		}).format(check);
	// 		console.log(typeof result, 'result');
	// 		let numResult = parseFloat(result);
	// 		console.log(typeof numResult, 'numResults');
	// 		return numResult;
	// 	} else {
	// 		console.log(typeof num);
	// 	}
	// };

	// const handlePrice = (e) => {
	// 	let userInput = e.target.value;
	// 	let test = userInput.substring(1);
	// 	console.log(test);
	// 	let test2 = parseFloat(test);
	// 	console.log(typeof test2, 'parsed');
	// 	test2 = formatter(test2);
	// 	console.log(typeof test2, 'after format');
	// 	// let rounded = Math.round((test2 + Number.EPSILON) * 100) / 100;
	// 	// console.log(typeof rounded, 'rounded', rounded);
	// 	setPrice(test2.toString());
	// };

	const handlePrice = (e) => {
		e.preventDefault();
		let userInput = e.target.value;
		const arr = userInput.split('');
		arr.shift();
		console.log(arr);
		if (arr[0] !== '0' && arr.length === 6) {
			return;
		}
		console.log(userInput.length);
		if (arr.length === 6) {
			arr.shift();
			const numbers = arr.filter((item) => item !== '.');
			numbers.splice(2, 0, '.');
			let result = numbers.join('');
			setPrice('$' + result);
		} else if (arr.length === 4) {
			arr.unshift('0');
			const numbers = arr.filter((item) => item !== '.');
			numbers.splice(2, 0, '.');
			let result = numbers.join('');
			setPrice('$' + result);
		} else if (arr.length < 4) {
			const diff = 4 - arr.length;
			for (let i = 0; i < diff; i++) {
				console.log('shifted');
				arr.unshift('0');
			}
			if (arr.length > 5) {
				arr.pop();
			}
			const numbers = arr.filter((item) => item !== '.');
			numbers.splice(2, 0, '.');
			let result = numbers.join('');
			setPrice('$' + result);
		}
	};

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
			<div className='input-container'>
				<TextField
					onChange={handlePacks}
					value={packs}
					type='number'
					variant='outlined'
					step='0.5'
					label='Number of packs per day'
					InputProps={{ inputProps: { min: 0, step: 0.5 } }}
				/>
				<TextField
					onChange={handlePrice}
					value={price}
					id='price-input'
					variant='outlined'
					label='Price per pack'
					inputProps={{
						inputMode: 'decimal',
						pattern: '[0-9]*',
					}}
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						onChange={handleDate}
						value={quitDate}
						format='MM/dd/yyyy'
						disableFuture={true}
						inputVariant='filled'
					/>
				</MuiPickersUtilsProvider>
				<Button variant='outlined' onClick={calcData}>
					Save
				</Button>
			</div>
			<div className='savings-container'>
				quiting for {daysQuit} days saved you {calculations.savings}
			</div>
			<div className='goal-container'>
				<p>goal 1: $100.00</p>
				<p>Progress: {(calculations.savings / 100.0) * 100 + '%'}</p>
				<p>Goal 2: $500</p>
				<p>Progress: {(calculations.savings / 500.0) * 100 + '%'}</p>
				<p>Goal 3: $1000</p>
				<p>Progress: {(calculations.savings / 1000.0) * 100 + '%'}</p>
			</div>
		</div>
	);
};

export default MainApp;
