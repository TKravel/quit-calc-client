import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const localString = (num) => {
	return parseFloat(num).toFixed(2).toLocaleString('en-EN');
};

const GoalInput = ({
	disabled,
	handleFreeGoal,
	handleUserGoals,
	handleGoalCount,
}) => {
	const { user } = useContext(UserContext);
	const { control, handleSubmit } = useForm({
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>Create a personal goal</p>
			<Controller
				name='goal'
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
				}) => (
					<>
						<input
							name='goal'
							value={value}
							onChange={onChange}
							tpye='text'
							autoComplete='false'
							label='Goal name'
							placeholder='Cool stuff'
							disabled={disabled}
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
				name='goalCost'
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
				}) => (
					<>
						<input
							type='number'
							name='goalCost'
							value={value}
							onChange={onChange}
							variant='outlined'
							label='Goal cost'
							placeholder='$00.00'
							disabled={disabled}
							inputProps={{
								inputMode: 'decimal',
								pattern: '[0-9]+(.[0-9]{2})',
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
			{errors && <p>{errors}</p>}
			<button type='submit' disabled={disabled}>
				Submit
			</button>
		</form>
	);
};

export default GoalInput;
