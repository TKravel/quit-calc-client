import React, { useContext, useEffect, useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useForm, Controller } from 'react-hook-form';
import { CalcDataContext } from '../../context/CalcDataContext';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../../context/UserContext';
const date = new Date();

const UserInput = ({ styles, headerText, buttonText }) => {
	const { user } = useContext(UserContext);
	const { formData, setFormData, setCalculations } =
		useContext(CalcDataContext);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			packs: '',
			price: '',
			quitDate: null,
		},
	});
	const [errors, setErrors] = useState('');

	const daysQuit = differenceInCalendarDays(date, formData.quitDate);

	const calcSavings = () => {
		const amount = parseFloat(formData.packs);
		const cost = parseFloat(formData.price);
		const moneySaved = amount * cost * daysQuit;

		setCalculations((prevValues) => {
			return { ...prevValues, savings: moneySaved.toFixed(2) };
		});
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
		<form className={styles} onSubmit={handleSubmit(onSubmit)}>
			<h2>{headerText}</h2>
			<div className='landing-input-container'>
				<Controller
					name='packs'
					control={control}
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<>
							<TextField
								value={value}
								onChange={onChange}
								placeholder='1'
								label='Number of packs per day'
								autoComplete='off'
								size='small'
								margin='normal'
								error={error ? true : false}
								helperText={error ? error.message : null}
								inputProps={{
									type: 'number',
									pattern: '^[0-9]\\d*(\\.\\d+)?$',
								}}
								InputLabelProps={{
									style: { color: '#999c98' },
								}}
								sx={{
									input: {
										'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
											{
												WebkitAppearance: 'none',
												display: 'none',
											},
										color: '#cdd1cc',
										width: '100% !important',
									},
									'& label.Mui-focused': {
										color: 'white',
									},
									'& .MuiInput-underline:after': {
										borderBottomColor: 'yellow',
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											color: 'white',
											border: 'none',
											borderBottom: '1px solid',
											borderBottomColor: 'white',
											borderRadius: '0',
										},
										'&:hover fieldset': {
											borderColor: 'white',
										},
										'&.Mui-focused fieldset': {
											borderColor: '#0ab377',
										},
									},
								}}
							/>
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
							<TextField
								onChange={onChange}
								value={value}
								placeholder='$00.00'
								id='price-input'
								label='Price per pack'
								autoComplete='off'
								margin='normal'
								size='small'
								error={error ? true : false}
								helperText={error ? error.message : null}
								inputProps={{
									type: 'number',
									pattern: '^[0-9]\\d*(\\.\\d+)?$',
								}}
								InputLabelProps={{
									style: { color: '#999c98' },
								}}
								sx={{
									input: {
										'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
											{
												WebkitAppearance: 'none',
												display: 'none',
											},
										color: '#cdd1cc',
									},
									'& label.Mui-focused': {
										color: 'white',
									},
									'& .MuiInput-underline:after': {
										borderBottomColor: 'yellow',
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											color: 'white',
											border: 'none',
											borderBottom: '1px solid',
											borderBottomColor: 'white',
											borderRadius: '0',
										},
										'&:hover fieldset': {
											borderColor: 'white',
										},
										'&.Mui-focused fieldset': {
											borderColor: '#0ab377',
										},
									},
								}}
							/>
						</>
					)}
					rules={{
						required: 'Required',
						pattern: '^[0-9]\\d*(\\.\\d+)?$',
					}}
				/>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Controller
						name='quitDate'
						control={control}
						render={({ field: { onChange, value } }) => (
							<DatePicker
								label='Quit date'
								value={value}
								onChange={onChange}
								renderInput={(params) => (
									<TextField
										{...params}
										InputLabelProps={{
											style: { color: '#999c98' },
										}}
										sx={{
											svg: { color: '#0ab377' },
											input: { color: '#cdd1cc' },
											label: { color: '#cdd1cc' },
											'& label.Mui-focused': {
												color: 'white',
											},
											'& .MuiInput-underline:after': {
												borderBottomColor: 'yellow',
											},
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													color: 'white',
													border: 'none',
													borderBottom: '1px solid',
													borderBottomColor: 'white',
													borderRadius: '0',
												},
												'&:hover fieldset': {
													borderColor: 'white',
												},
												'&.Mui-focused fieldset': {
													borderColor: '#0ab377',
												},
											},
										}}
									/>
								)}
							/>
						)}
					/>
				</LocalizationProvider>
			</div>
			<button className='button' id='subButton' type='submit'>
				{buttonText}
			</button>
			<p>{errors && errors}</p>
		</form>
	);
};

export default UserInput;
