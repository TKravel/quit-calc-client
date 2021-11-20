import React, { useContext } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';

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
}));

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

	const saveGoal = (goal) => {
		if (!user) {
			handleFreeGoal(goal.goal, goal.goalCost);
		} else {
			fetch('/goals/create_goal', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				credentials: 'include',
				body: JSON.stringify(goal),
			})
				.then((responce) => responce.json())
				.then((data) => {
					console.log('data returned');
					if (data.error) {
						console.log(data.error);
						//Display error to user
					}
					if (data.count && data.doc) {
						handleGoalCount(data.count);
						console.log('test adding');
						handleUserGoals((prevValue) => {
							return [
								...prevValue,
								{
									goal: goal.goal,
									goalCost: goal.goalCost,
								},
							];
						});
					}
				})
				.catch((err) => {
					if (err) {
						console.log(err);
						//Display error to user
					}
				});
		}
	};

	const onSubmit = (goal) => {
		console.log(goal);
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
