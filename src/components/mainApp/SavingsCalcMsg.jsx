import React, { useContext } from 'react';
import { CalcDataContext } from '../../context/CalcDataContext';
import { differenceInCalendarDays } from 'date-fns';

const monthlySavings = [
	{
		item: 'cellular service',
		cost: 128,
	},
	{
		item: 'food',
		cost: 275,
	},
	{
		item: 'rent',
		cost: 1220,
	},
];

const SavingsCalcMsg = () => {
	const { formData, calculations } = useContext(CalcDataContext);
	const date = new Date();
	const daysQuit = differenceInCalendarDays(date, formData.quitDate);
	const savings = parseFloat(calculations.savings).toFixed(2);
	return (
		<div>
			<p>
				Quiting for
				{daysQuit === 1 ? ` ${daysQuit} day` : ` ${daysQuit} days`}{' '}
				saved you <strong>${savings}!</strong>
			</p>

			<p>Lets break that down and visualize how it helps you monthly.</p>
			<p>So far your savings have helped with the following bills:</p>
			<ul>
				{monthlySavings.map((arrItem, index) => {
					const thirdOfSavings = calculations.savings / 3;
					const numOfItems = thirdOfSavings / arrItem.cost;
					const item = arrItem.item;
					const monthForm = numOfItems <= 1 ? 'months' : "months'";

					return (
						<li key={index}>
							{`${numOfItems.toFixed(2)} ${monthForm} of ${item}`}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SavingsCalcMsg;
