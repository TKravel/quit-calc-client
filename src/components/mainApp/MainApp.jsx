import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import { differenceInCalendarDays } from 'date-fns';
import '../../index.css';
import UserInput from './UserInput';
import SavingsCalcMsg from './SavingsCalcMsg';
import GoalTracker from './GoalTracker';
import NavBar from '../NavBar';

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
		setCalculations({ savings: moneySaved.toFixed(2) });
	};

	useEffect(() => {
		let progressDisplay = document.getElementById('savings-msg');
		if (progressDisplay !== null) {
			progressDisplay.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [calculations]);

	return (
		<Container component='main' className='app-container'>
			<NavBar />
			{/* <Typography variant='h1'>h1</Typography>
			<Typography variant='h2'>h2</Typography>
			<Typography variant='h3'>h3</Typography>
			<Typography variant='h4'>h4</Typography>
			<Typography variant='h5'>h5</Typography>
			<Typography variant='h6'>h6</Typography>
			<Typography variant='subtitle1'>subtitle1</Typography>
			<Typography variant='subtitle2'>subtitle2</Typography>
			<Typography variant='body1'>body1</Typography>
			<Typography variant='body2'>body2</Typography> */}
			<Typography
				variant='h4'
				component='h1'
				align='center'
				gutterBottom={true}
			>
				Quit smoking savings calculator
			</Typography>

			<Typography></Typography>
			<Typography variant='body1' paragraph align='center'>
				Motivate yourself to quit by creating personal goals, tracking
				progress, and spoiling yourself with gifts bought from the
				savings!
			</Typography>

			<Typography variant='body1' paragraph align='center'>
				Start by filling out the form below to see your savings.
			</Typography>
			<Typography variant='body1' paragraph align='center'>
				Sign up to customize goals to motivate you!
			</Typography>
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
					<Grid item xs={12} sm={6} id='savings-msg'>
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
		</Container>
	);
};

export default MainApp;
