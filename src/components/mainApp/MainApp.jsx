import React, { useContext, useEffect, useState } from 'react';
import '../../index.css';
import DemoMsg from '../demoComponents/DemoMsg';
import DemoWarning from '../demoComponents/DemoWarning';
import UserInput from './UserInput';
import { GoalTracker1 } from './goalTracker/GoalTracker1';
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
	const [errors, setErrors] = useState('');

	const demoUser = localStorage.getItem('demoUser');

	useEffect(() => {
		if (errors !== '') {
			setErrors('');
		}
		if (user) {
			fetch(`${process.env.REACT_APP_SERVER}/form/get_form`, {
				method: 'GET',
				credentials: 'include',
			})
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

	// useEffect(() => {
	// 	let progressDisplay = document.getElementById('savings-msg');
	// 	const scroll = () => {
	// 		progressDisplay.scrollIntoView(true, {
	// 			behavior: 'smooth',
	// 			block: 'start',
	// 		});
	// 	};

	// 	if (progressDisplay !== null) {
	// 		if (demoUser === 'true') {
	// 			return;
	// 		} else {
	// 			scroll();
	// 		}
	// 	}
	// }, [calculations]);

	return (
		<CalcDataContext.Provider
			value={{ formData, setFormData, calculations, setCalculations }}
		>
			<div className='app-container'>
				{demoUser === 'true' ? <DemoWarning /> : <DemoMsg />}

				<h1>Quit smoking savings calculator</h1>

				<p>
					Motivate yourself to quit by creating personal goals,
					tracking progress, and spoiling yourself with gifts bought
					from the savings!
				</p>

				<p>Start by filling out the form below to see your savings.</p>
				<p>Sign up to customize goals to motivate you!</p>

				<p>{errors && errors}</p>

				<UserInput />

				{calculations.savings !== 0 && (
					<>
						<GoalTracker1 />
					</>
				)}
			</div>
		</CalcDataContext.Provider>
	);
};

export default MainApp;
