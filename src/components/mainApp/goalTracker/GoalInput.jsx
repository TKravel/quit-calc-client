import React, { useContext, useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';

const useStyles = makeStyles((theme) => ({
	form: {
		padding: '1.5em 0.5em',
	},
	disabled: {
		padding: '1.5em 0.5em',
		color: '#606060',
	},
	button: {
		backgroundColor: theme.palette.secondary.dark,
		margin: '10px !important',
	},
	error: {
		color: theme.palette.error.main,
	},
}));

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
	const classes = useStyles();
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
			fetch(`${REACT_APP_SERVER}/goals/create_goal`, {
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
		<Container
			component='form'
			className={disabled ? classes.disabled : classes.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Typography variant='h5' component='h3' gutterBottom={true}>
				Create a personal goal
			</Typography>
			<Controller
				name='goal'
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
				}) => (
					<TextField
						name='goal'
						value={value}
						onChange={onChange}
						variant='outlined'
						tpye='text'
						autoComplete='false'
						label='Goal name'
						placeholder='Cool stuff'
						disabled={disabled}
						error={error ? true : false}
						helperText={error ? error.message : null}
					/>
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
					<TextField
						name='goalCost'
						value={value}
						onChange={onChange}
						variant='outlined'
						label='Goal cost'
						placeholder='$00.00'
						disabled={disabled}
						error={error ? true : false}
						helperText={error ? error.message : null}
						inputProps={{
							inputMode: 'decimal',
							pattern: '[0-9]+(.[0-9]{2})',
						}}
					/>
				)}
				rules={{
					required: 'Required',
					pattern: '^[0-9]\\d*(\\.\\d+)?$',
				}}
			/>
			{errors && (
				<Typography className={classes.error} variant='body1' paragraph>
					{errors}
				</Typography>
			)}
			<Button
				className={classes.button}
				type='submit'
				variant='contained'
				color='secondary'
				disabled={disabled}
			>
				Submit
			</Button>
		</Container>
	);
};

export default GoalInput;
