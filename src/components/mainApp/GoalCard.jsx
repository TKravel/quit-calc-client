import React, { useContext } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CalcDataContext } from '../../context/CalcDataContext';

const useStyles = makeStyles((theme) => ({
	progressCircle: {
		position: 'absolute',
		left: 'calc(50% - 20px)',
		color: theme.palette.secondary.dark,
		zIndex: '10',
	},
	progressCircleBG: {
		position: 'relative',
		color: theme.palette.primary.main,
		zIndex: '1',
	},
}));

const GoalCard = ({ goalName, goalAmount }) => {
	const classes = useStyles();
	const { calculations } = useContext(CalcDataContext);
	const savings = parseFloat(calculations.savings);
	let percent = (savings / goalAmount) * 100;
	percent = parseFloat(percent.toFixed(1));
	console.log(calculations);
	console.log(savings);
	return (
		<>
			<Typography variant='h5' component='h3' gutterBottom={true}>
				{goalName}: ${goalAmount}
			</Typography>

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
			<Typography variant='body1' paragraph>
				Progress: {percent >= 100 ? 'Complete!' : percent + '%'}
			</Typography>
		</>
	);
};

export default GoalCard;
