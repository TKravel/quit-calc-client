import React from 'react';

export const CompletedCard = ({ completed, sortFunc }) => {
	if (completed.length === 0) {
		return <p>Keep going, collected goals will be displayed here.</p>;
	} else {
		return (
			<>
				<p className='completed-text'>
					Congratulations on your achievements!
				</p>
				<div className='completed-list'>
					<ul>
						{completed.sort(sortFunc).map((goal, index) => {
							return (
								<li key={index}>
									{`${goal.goal}: $${parseFloat(
										goal.goalCost
									).toFixed(2)}`}
								</li>
							);
						})}
					</ul>
				</div>
				<p className='completed-text'>
					Keep going to collect more goals!
				</p>
			</>
		);
	}
};
