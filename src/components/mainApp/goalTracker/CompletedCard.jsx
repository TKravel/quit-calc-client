import React from 'react';

const CompletedCard = ({ completed, sortFunc }) => {
	if (completed.length === 0) {
		return <p>Keep going, collected goals will be displayed here.</p>;
	} else {
		return (
			<>
				<p>Congratulations on your achievements!</p>
				<ul>
					{completed.sort(sortFunc).map((goal, index) => {
						return (
							<li key={index}>
								{`${goal.goal}: $$
								{parseFloat(goal.goalCost).toFixed(2)}`}
							</li>
						);
					})}
				</ul>
				<p>Keep going to collect more goals!</p>
			</>
		);
	}
};

export default CompletedCard;
