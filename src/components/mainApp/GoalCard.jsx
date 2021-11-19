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

const GoalCard = ({ index, goalName, goalAmount }) => {
	const classes = useStyles();
	const { calculations } = useContext(CalcDataContext);
	const savings = parseFloat(calculations.savings);
	let percent = (savings / goalAmount) * 100;
	percent = parseFloat(percent.toFixed(1));

	const handleDelete = (e) => {
		const item = e.target;
		console.log(item);
	};

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
			{/* <svg
				index={index}
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				onClick={handleDelete}
			>
				<path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
			</svg> */}
		</>
	);
};

export default GoalCard;
