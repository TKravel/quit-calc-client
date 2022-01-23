import React, { useContext, useEffect, useState } from 'react';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useForm, Controller } from 'react-hook-form';
import { CalcDataContext } from '../../context/CalcDataContext';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../../context/UserContext';

const date = new Date();

const UserInput = () => {
	const { user } = useContext(UserContext);
	const { formData, setFormData, setCalculations } =
		useContext(CalcDataContext);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			packs: '',
			price: '',
			quitDate: date,
		},
	});
	const [errors, setErrors] = useState('');

	const daysQuit = differenceInCalendarDays(date, formData.quitDate);

	const calcSavings = () => {
		const amount = parseFloat(formData.packs);
		const cost = parseFloat(formData.price);
		const moneySaved = amount * cost * daysQuit;

		setCalculations({ savings: moneySaved.toFixed(2) });
	};

	const onSubmit = (userData) => {
		if (errors !== '') {
			setErrors('');
		}
		if (!user) {
			console.log('no user');
			setFormData({
				packs: userData.packs,
				price: userData.price,
				quitDate: new Date(userData.quitDate),
			});
		} else if (user) {
			console.log('user found');
			if (JSON.stringify(userData) === JSON.stringify(formData)) {
				console.log('user data the same');
				return;
			}
			fetch(`${process.env.REACT_APP_SERVER}/form/save_input`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				credentials: 'include',
				body: JSON.stringify(userData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						console.log('Server error saving data: ' + data.error);
						setErrors(data.error);
					}
					if (data.msg === 'Success') {
						setFormData({
							packs: userData.packs,
							price: userData.price,
							quitDate: userData.quitDate,
						});
						calcSavings();
					}
				})
				.catch((err) => {
					console.log('Error saving data: ' + err);
					setErrors('Server error, Please try again later.');
				});
		}
	};

	useEffect(() => {
		if (formData.packs !== '') {
			reset(formData);
			calcSavings();
		}
	}, [formData]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='packs'
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
				}) => (
					<>
						<input
							type='number'
							value={value}
							onChange={onChange}
							label='Number of packs per day'
							autoComplete='off'
							inputprops={{
								inputMode: 'decimal',
								pattern: '^[0-9]\\d*(\\.\\d+)?$',
							}}
						/>
						<p>{error ? error.message : null}</p>
					</>
				)}
				rules={{
					required: 'Required',
					pattern: '^[0-9]\\d*(\\.\\d+)?$',
				}}
			/>

			<Controller
				name='price'
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
				}) => (
					<>
						<input
							placeholder='$00.00'
							onChange={onChange}
							value={value}
							id='price-input'
							label='Price per pack'
							autoComplete='off'
							inputprops={{
								inputMode: 'decimal',
								pattern: '[0-9]+(.[0-9]{2})',
							}}
						/>
						<p>{error && error.message}</p>
					</>
				)}
				rules={{
					required: 'Required',
					pattern: '^[0-9]\\d*(\\.\\d+)?$',
				}}
			/>

			{/* <MuiPickersUtilsProvider utils={DateFnsUtils} id='date-picker'>
				<Controller
					name='quitDate'
					control={control}
					render={({ field: { onChange, value } }) => (
						<KeyboardDatePicker
							onChange={onChange}
							value={value}
							format='MM/dd/yyyy'
							disableFuture={true}
							inputVariant='outlined'
						/>
					)}
				/>
			</MuiPickersUtilsProvider> */}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Controller
					name='quitDate'
					control={control}
					render={({ field: { onChange, value } }) => (
						<DatePicker
							label='Basic example'
							value={value}
							onChange={onChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					)}
				/>
			</LocalizationProvider>

			<button id='subButton' type='submit'>
				Calculate
			</button>
			<p>{errors && errors}</p>
		</form>
	);
};

export default UserInput;
