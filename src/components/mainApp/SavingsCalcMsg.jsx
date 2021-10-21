import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.light,
		padding: '1em',
		margin: '1em auto 1em auto',
		maxWidth: '80%',
		textAlign: 'center',
	},
}));

const SavingsCalcMsg = ({ daysQuit, calculations }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.paper} elevation={8}>
			<Typography variant='h4' component='h2'>
				Quiting for
				{daysQuit === 1 ? ` ${daysQuit} day` : ` ${daysQuit} days`}{' '}
				saved you <strong>${calculations.savings}!</strong>
			</Typography>
		</Paper>
	);
};

export default SavingsCalcMsg;
