import React, { useContext } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CalcDataContext } from '../../context/CalcDataContext';
import { differenceInCalendarDays } from 'date-fns';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.light,
		padding: '1em',
		margin: '1em auto 1em auto',
		maxWidth: '80%',
		textAlign: 'center',
	},
}));

const SavingsCalcMsg = () => {
	const classes = useStyles();
	const { formData, calculations } = useContext(CalcDataContext);
	const date = new Date();
	const daysQuit = differenceInCalendarDays(date, formData.quitDate);
	const savings = parseFloat(calculations.savings).toFixed(2);
	return (
		<Paper className={classes.paper} elevation={8}>
			<Grid
				container
				className='input-container'
				direction='row'
				justifyContent='center'
				alignItems='center'
			>
				<Grid item>
					<Typography variant='h4' component='h2'>
						Quiting for
						{daysQuit === 1
							? ` ${daysQuit} day`
							: ` ${daysQuit} days`}{' '}
						saved you <strong>${savings}!</strong>
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default SavingsCalcMsg;
