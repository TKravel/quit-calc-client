import React from 'react';
import { Grid } from '@material-ui/core';

const SavingsCalcMsg = ({ daysQuit, calculations }) => {
	return (
		<Grid
			container
			className='input-container'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<Grid item xs={12} sm={6}>
				<div
					className='savings-container'
					sx={{ style: { margin: '10px' } }}
				>
					Quiting for
					{daysQuit === 1
						? ` ${daysQuit} day`
						: ` ${daysQuit} days`}{' '}
					saved you ${calculations.savings}.
				</div>
			</Grid>
		</Grid>
	);
};

export default SavingsCalcMsg;
