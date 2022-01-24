import React, { useContext } from 'react';
import { CalcDataContext } from '../../../context/CalcDataContext';
import CheckMarkIcon from '../../icons/CheckMarkIcon';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const MilestoneCard = ({ idx, goalName, goalAmount }) => {
	const { calculations } = useContext(CalcDataContext);
	const savings = parseFloat(calculations.savings);
	let percent = (savings / goalAmount) * 100;
	percent = parseFloat(percent.toFixed(1));

	if (percent >= 100) {
		return (
			<div key={idx} className='goal-card'>
				<CheckMarkIcon />
				<div>
					<p>
						{goalName}: ${goalAmount}
					</p>

					<p>
						{percent >= 100 ? 'Complete!' : `Progress: ${percent}%`}
					</p>
				</div>
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

					<p>
						{percent >= 100 ? 'Complete!' : `Progress: ${percent}%`}
					</p>
				</div>
			</div>
		);
	}
};
