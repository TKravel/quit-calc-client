import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../../index.css';
import DemoMsg from '../demoComponents/DemoMsg';
import DemoWarning from '../demoComponents/DemoWarning';
import UserInput from './UserInput';
import SavingsCalcMsg from './SavingsCalcMsg';
import GoalTracker from './goalTracker/GoalTracker';
import { UserContext } from '../../context/UserContext';
import { CalcDataContext } from '../../context/CalcDataContext';
import { parseISO } from 'date-fns';

const useStyles = makeStyles((theme) => ({
	error: {
		color: theme.palette.error.main,
	},
}));

const MainApp = () => {
	const { user } = useContext(UserContext);
	const classes = useStyles();

	const [formData, setFormData] = useState({
		packs: '',
		price: '',
		quitDate: null,
	});
	const [calculations, setCalculations] = useState({
		savings: 0,
	});
	const [errors, setErrors] = useState('');

	const demoUser = localStorage.getItem('demoUser');

	useEffect(() => {
		if (errors !== '') {
			setErrors('');
		}
		if (user) {
			fetch(
				'https://protected-badlands-62393.herokuapp.com/form/get_form',
				{
					method: 'GET',
					credentials: 'include',
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						console.log(data.error);
						setErrors(data.error);
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
					setErrors('Server Error, please try again later.');
				});
		}
	}, [user]);

	useEffect(() => {
		let progressDisplay = document.getElementById('savings-msg');
		const scroll = () => {
			progressDisplay.scrollIntoView(true, {
				behavior: 'smooth',
				block: 'start',
			});
		};

		if (progressDisplay !== null) {
			if (demoUser === 'true') {
				return;
			} else {
				scroll();
			}
		}
	}, [calculations]);

	return (
		<CalcDataContext.Provider
			value={{ formData, setFormData, calculations, setCalculations }}
		>
			<Container component='main' className='app-container'>
				{demoUser === 'true' ? <DemoWarning /> : <DemoMsg />}

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

				<Typography
					className={classes.error}
					variant='body1'
					paragraph
					align='center'
				>
					{errors && errors}
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
