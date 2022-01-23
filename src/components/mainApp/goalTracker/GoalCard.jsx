import React, { useContext } from 'react';
import { CalcDataContext } from '../../../context/CalcDataContext';
import StarIcon from '../../icons/StarIcon';
import TrashIcon from '../../icons/TrashIcon';

const GoalCard = ({
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
			<>
				<p>
					{goalName}: ${goalAmount}
				</p>
				<StarIcon
					goalName={goalName}
					goalAmount={goalAmount}
					handleCompletion={handleCompletion}
					errors={errors}
					setErrors={setErrors}
				/>
				<p>Complete!</p>
				{errors && <p>{errors}</p>}
			</>
		);
	} else {
		return (
			<>
				<p>
					{goalName}: ${goalAmount}
				</p>

				<p>Progress: {percent}%</p>
				<TrashIcon
					item={goalName}
					handleGoals={handleGoals}
					handleCount={handleCount}
					errors={errors}
					setErrors={setErrors}
				/>
				{errors && <p>{errors}</p>}
			</>
		);
	}
};

export default GoalCard;
