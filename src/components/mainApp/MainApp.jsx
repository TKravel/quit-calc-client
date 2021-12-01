import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import '../../index.css';
import UserInput from './UserInput';
import SavingsCalcMsg from './SavingsCalcMsg';
import GoalTracker from './goalTracker/GoalTracker';
import { UserContext } from '../../context/UserContext';
import { CalcDataContext } from '../../context/CalcDataContext';
import { parseISO } from 'date-fns';

const MainApp = () => {
	const { user } = useContext(UserContext);

	const [formData, setFormData] = useState({
		packs: '',
		price: '',
		quitDate: null,
	});
	const [calculations, setCalculations] = useState({
		savings: 0,
	});

	useEffect(() => {
		if (user) {
			fetch('/form/get_form', {
				method: 'GET',
				credentials: 'include',
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						console.log(data.error);
						//Display error to user
					}
					if (data.msg) {
						console.log('No data saved yet');
					} else if (data.formData) {
						const fetchedDate = data.formData.quitDate;
						setFormData({
							packs: parseInt(data.formData.packs),
							price: parseFloat(data.formData.price),
							quitDate: parseISO(fetchedDate),
						});
					}
				})
				.catch((err) => {
					console.log('Error fetching form: ' + err);
				});
		}
	}, [user]);

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
		<CalcDataContext.Provider
			value={{ formData, setFormData, calculations, setCalculations }}
		>
			<Container component='main' className='app-container'>
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
					Motivate yourself to quit by creating personal goals,
					tracking progress, and spoiling yourself with gifts bought
					from the savings!
				</Typography>

				<Typography variant='body1' paragraph align='center'>
					Start by filling out the form below to see your savings.
				</Typography>
				<Typography variant='body1' paragraph align='center'>
					Sign up to customize goals to motivate you!
				</Typography>

				<UserInput />

				{calculations.savings !== 0 && (
					<>
						<SavingsCalcMsg />
						<GoalTracker />
					</>
				)}
			</Container>
		</CalcDataContext.Provider>
	);
};

export default MainApp;
