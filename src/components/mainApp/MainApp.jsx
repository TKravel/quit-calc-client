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
		spent: 0,
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

	return (
		<CalcDataContext.Provider
			value={{ formData, setFormData, calculations, setCalculations }}
		>
			<>
				{demoUser === 'true' ? <DemoWarning /> : <DemoMsg />}

				{calculations.savings === 0 && (
					<>
						<div className='landing-msg'>
							<h1>
								QUIT SMOKING
								<br />
								SET GOALS
								<br />
								TRACK SAVINGS
							</h1>
							<p>
								Create goals as motivation. Vizualize progress
								and savings. Stay on track.
							</p>
						</div>

						<p className='start-instructions'>
							Start by filling out the form below to see your
							savings.
						</p>
						<p className='start-instructions'>
							Sign up to customize goals to motivate you!
						</p>

						<p>{errors && errors}</p>

						<UserInput
							styles='landing-form'
							headerText={`Let's get some info!`}
							buttonText='Calculate'
						/>
					</>
				)}

				{calculations.savings !== 0 && (
					<>
						<GoalTracker1 />
					</>
				)}
			</>
		</CalcDataContext.Provider>
	);
};

export default MainApp;
