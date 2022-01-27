import React, { useContext } from 'react';
import { CalcDataContext } from '../../../context/CalcDataContext';
import StarIcon from '../../icons/StarIcon';
import TrashIcon from '../../icons/TrashIcon';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const GoalCard = ({
	idx,
	goalName,
	goalAmount,
	handleGoals,
	handleCount,
	handleCompletion,
	errors,
	setErrors,
}) => {
	const { calculations } = useContext(CalcDataContext);

	const savings = parseFloat(calculations.savings);
	let percent = (savings / goalAmount) * 100;
	percent = parseFloat(percent.toFixed(1));

	if (percent >= 100) {
		return (
			<div key={idx} className='goal-card'>
				<StarIcon
					goalName={goalName}
					goalAmount={goalAmount}
					handleCompletion={handleCompletion}
					errors={errors}
					setErrors={setErrors}
				/>
				<div>
					<p>
						{goalName}: ${goalAmount}
					</p>

					<p>Complete!</p>
				</div>
				{errors && <p className='goal-card-error'>{errors}</p>}
			</div>
		);
	} else {
		return (
			<div key={idx} className='goal-card'>
				<CircularProgressbarWithChildren
					className='progress-circle'
					value={percent}
					text={`${percent}%`}
					styles={buildStyles({
						pathColor: `#0ab377`,
						textColor: '#0ab377',
						trailColor: '#6e6d6e',
						backgroundColor: '#0ab377',
					})}
				/>
				<div>
					<p>
						{goalName}: ${goalAmount}
					</p>

					<p>Progress: {percent}%</p>
				</div>
				<TrashIcon
					item={goalName}
					handleGoals={handleGoals}
					handleCount={handleCount}
					errors={errors}
					setErrors={setErrors}
				/>
				{errors && <p>{errors}</p>}
			</div>
		);
	}
};
