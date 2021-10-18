import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	progressCircle: {
		position: 'absolute',
		left: 'calc(50% - 20px)',
		color: theme.palette.secondary.dark,
		zIndex: '10',
	},
	progressCircleBG: {
		position: 'relative',
		color: theme.palette.primary.dark,
		zIndex: '1',
	},
}));

const GoalCard = ({ goalName, goalAmount, calculations }) => {
	const classes = useStyles();
	const savings = parseFloat(calculations.savings);
	let percent = (savings / goalAmount) * 100;
	percent = parseFloat(percent.toFixed(1));
	return (
		<>
			<p>
				{goalName}: ${goalAmount}
			</p>
			<CircularProgress
				id='progress-circle-BG'
				className={classes.progressCircleBG}
				value={100}
				variant='determinate'
				thickness={10}
			/>
			<CircularProgress
				id='progress-cricle'
				className={classes.progressCircle}
				value={percent >= 100 ? 100 : percent}
				variant='determinate'
				thickness={10}
			/>

			<p> Progress: {percent >= 100 ? 'Complete' : percent}%</p>
		</>
	);
};

export default GoalCard;