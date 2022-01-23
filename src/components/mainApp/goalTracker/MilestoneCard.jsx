import React, { useContext } from 'react';
import { CalcDataContext } from '../../../context/CalcDataContext';
import CheckMarkIcon from '../../icons/CheckMarkIcon';

const GoalCard = ({ goalName, goalAmount }) => {
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
				<CheckMarkIcon />
				<p>{percent >= 100 ? 'Complete!' : `Progress: ${percent}%`}</p>
			</>
		);
	} else {
		return (
			<>
				<p>
					{goalName}: ${goalAmount}
				</p>

				<p>{percent >= 100 ? 'Complete!' : `Progress: ${percent}%`}</p>
			</>
		);
	}
};

export default GoalCard;
