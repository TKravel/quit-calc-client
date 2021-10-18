import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { differenceInCalendarDays } from 'date-fns';
import '../../index.css';
import UserInput from './UserInput';
import SavingsCalcMsg from './SavingsCalcMsg';
import GoalTracker from './GoalTracker';

const MainApp = () => {
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

	const handleDate = (value) => {
		setQuitDate(value);
		console.log(value, quitDate);
	};

	const calcData = (e) => {
		e.preventDefault();

		if (packs === '' || packs === '0') {
			setErrors((prevValues) => {
				return {
					...prevValues,
					packs: true,
					packsMsg: 'Price Required',
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
		if (price === '' || price === '0') {
			setErrors((prevValues) => {
				return {
					...prevValues,
					price: true,
					priceMsg: 'Price Required',
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
		const amount = parseFloat(packs);
		const cost = parseFloat(price);
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
				<Grid item xs={12} sm={6}>
					<UserInput
						packs={packs}
						handlePacks={handlePacks}
						price={price}
						handlePrice={handlePrice}
						quitDate={quitDate}
						handleDate={handleDate}
						calcData={calcData}
						errors={errors}
					/>
				</Grid>
				{calculations.savings !== 0 && (
					<Grid item xs={12} sm={6}>
						<SavingsCalcMsg
							daysQuit={daysQuit}
							calculations={calculations}
						/>
					</Grid>
				)}
			</Grid>
			{calculations.savings !== 0 && (
				<GoalTracker calculations={calculations} />
			)}
		</div>
	);
};

export default MainApp;
