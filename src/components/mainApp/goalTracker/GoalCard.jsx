import React, { useContext, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CalcDataContext } from '../../../context/CalcDataContext';
import StarIcon from '../../icons/StarIcon';
import TrashIcon from '../../icons/TrashIcon';

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
	error: {
		color: theme.palette.error.main,
	},
}));

const GoalCard = ({
	goalName,
	goalAmount,
	handleGoals,
	handleCount,
	handleCompletion,
	errors,
	setErrors,
}) => {
	const classes = useStyles();
	const { calculations } = useContext(CalcDataContext);

	const savings = parseFloat(calculations.savings);
	let percent = (savings / goalAmount) * 100;
	percent = parseFloat(percent.toFixed(1));

	if (percent >= 100) {
		return (
			<>
				<Typography variant='h5' component='h3' gutterBottom={true}>
					{goalName}: ${goalAmount}
				</Typography>
				<StarIcon
					goalName={goalName}
					goalAmount={goalAmount}
					handleCompletion={handleCompletion}
					errors={errors}
					setErrors={setErrors}
				/>
				<Typography variant='body1' paragraph>
					Complete!
				</Typography>
				{errors && (
					<Typography
						className={classes.error}
						variant='body1'
						paragraph
					>
						{errors}
					</Typography>
				)}
			</>
		);
	} else {
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
					Progress: ${percent}%
				</Typography>
				<TrashIcon
					item={goalName}
					handleGoals={handleGoals}
					handleCount={handleCount}
					errors={errors}
					setErrors={setErrors}
				/>
				{errors && (
					<Typography
						className={classes.error}
						variant='body1'
						paragraph
					>
						{errors}
					</Typography>
				)}
			</>
		);
	}
};

export default GoalCard;
