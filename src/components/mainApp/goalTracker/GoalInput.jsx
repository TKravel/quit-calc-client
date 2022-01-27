import React, { useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const localString = (num) => {
	return parseFloat(num).toFixed(2).toLocaleString('en-EN');
};

const GoalInput = ({
	count,
	handleFreeGoal,
	handleUserGoals,
	handleGoalCount,
}) => {
	const { user } = useContext(UserContext);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			goal: '',
			goalCost: '',
		},
	});
	const [errors, setErrors] = useState('');

	const saveGoal = (goal) => {
		const goalData = {
			goal: capitalizeFirstLetter(goal.goal),
			goalCost: localString(goal.goalCost),
		};
		if (errors !== '') {
			setErrors('');
		}
		if (!user) {
			handleFreeGoal(goalData.goal, goalData.goalCost);
		} else {
			fetch(`${process.env.REACT_APP_SERVER}/goals/create_goal`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				credentials: 'include',
				body: JSON.stringify(goalData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						console.log(data.error);
						setErrors(data.error);
					}
					if (data.count && data.doc) {
						handleGoalCount(data.count);
						handleUserGoals((prevValue) => {
							return [
								...prevValue,
								{
									goal: goalData.goal,
									goalCost: goalData.goalCost,
								},
							];
						});
						reset({
							goal: '',
							goalCost: '',
						});
					}
				})
				.catch((err) => {
					if (err) {
						console.log(err);
						setErrors('Server error. Please try again later');
					}
				});
		}
	};

	const onSubmit = (goal) => {
		saveGoal(goal);
	};
	return (
		<div className='goal-form-wrapper'>
			<form
				className='goal-form'
				onSubmit={handleSubmit(onSubmit)}
				autoComplete='off'
			>
				{count === 6 ? (
					<p>Maximun of 6 goals</p>
				) : (
					<p>Create a personal goal</p>
				)}
				<Controller
					name='goal'
					control={control}
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<>
							<TextField
								name='goal'
								value={value}
								onChange={onChange}
								tpye='text'
								label='Goal name'
								placeholder='Cool stuff'
								disabled={count === 6 ? true : false}
								margin='normal'
								size='small'
								error={error ? true : false}
								helperText={error ? error.message : null}
								inputProps={{
									autoComplete: 'false',
								}}
								InputLabelProps={{
									style: { color: '#999c98' },
								}}
								sx={{
									input: {
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
					name='goalCost'
					control={control}
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<>
							<TextField
								type='number'
								name='goalCost'
								value={value}
								onChange={onChange}
								variant='outlined'
								label='Goal cost'
								placeholder='$00.00'
								disabled={count === 6 ? true : false}
								margin='normal'
								size='small'
								error={error ? true : false}
								helperText={error ? error.message : null}
								inputProps={{
									autoComplete: 'false',
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
				{errors && <p className='error-msg'>{errors}</p>}
				<button
					className='button'
					type='submit'
					disabled={count === 6 ? true : false}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default GoalInput;
