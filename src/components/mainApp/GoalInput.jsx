import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	form: {
		padding: '1.5em 0.5em',
	},
	disabled: {
		padding: '1.5em 0.5em',
		color: '#606060',
	},
});
const GoalInput = ({ disabled, setDisabled, userGoals, handleGoals }) => {
	const classes = useStyles();
	const [goal, setGoal] = useState('');
	const [goalCost, setGoalCost] = useState();
	const [errors, setErrors] = useState({
		goal: false,
		goalMsg: '',
		cost: false,
		costMsg: '',
	});

	const handleCost = (e) => {
		const userInput = e.target.value;
		console.log(userInput);
		console.log(typeof goalCost);
		if (isNaN(userInput)) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					cost: true,
					costMsg: 'Only enter numbers',
				};
			});
			return;
		} else if (errors.cost) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					cost: false,
					costMsg: '',
				};
			});
		}
		setGoalCost(userInput);
	};
	const handleGoal = (e) => {
		const userInput = e.target.value;
		if (userInput === '') {
			setErrors((prevValues) => {
				return {
					...prevValues,
					goal: true,
					goalMsg: 'Required',
				};
			});
			return;
		} else if (errors.goal) {
			setErrors((prevValues) => {
				return {
					...prevValues,
					goal: false,
					goalMsg: '',
				};
			});
		}
		setGoal(userInput);
	};
	const saveGoal = (e) => {
		e.preventDefault();
		console.log('clicked');
		if (errors.goal === true || errors.cost === true) {
			return;
		}
		if (goal === '' || goalCost === 0) {
			return;
		}
		setDisabled(true);
		console.log(disabled);
		handleGoals(goal, goalCost);
	};
	return (
		<Container
			component='form'
			className={disabled ? classes.disabled : classes.form}
		>
			<Typography variant='h5' component='h3' gutterBottom={true}>
				Create a personal goal
			</Typography>
			<TextField
				name='goal'
				value={goal}
				onChange={handleGoal}
				variant='outlined'
				tpye='text'
				autoComplete='false'
				label='Goal name'
				placeholder='Cool stuff'
				disabled={disabled}
				error={errors.goal ? true : false}
				helperText={errors.goalMsg ? errors.goalMsg : null}
			/>
			<TextField
				name='goalCost'
				value={goalCost}
				onChange={handleCost}
				variant='outlined'
				label='Goal cost'
				placeholder='$00.00'
				disabled={disabled}
				error={errors.cost ? true : false}
				helperText={errors.costMsg ? errors.costMsg : null}
				inputProps={{
					inputMode: 'decimal',
					pattern: '[0-9]+(.[0-9]{2})',
				}}
			/>
			<Button
				variant='contained'
				color='secondary'
				onClick={saveGoal}
				disabled={disabled}
			>
				Submit
			</Button>
		</Container>
	);
};

export default GoalInput;
