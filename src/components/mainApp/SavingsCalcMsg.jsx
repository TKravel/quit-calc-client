import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.light,
		padding: '1em',
		margin: '1em',
	},
}));

const SavingsCalcMsg = ({ daysQuit, calculations }) => {
	const classes = useStyles();
	return (
		<Grid
			container
			className='input-container'
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper} elevation={8}>
					Quiting for
					{daysQuit === 1
						? ` ${daysQuit} day`
						: ` ${daysQuit} days`}{' '}
					saved you ${calculations.savings}!
				</Paper>
			</Grid>
		</Grid>
	);
};

export default SavingsCalcMsg;
