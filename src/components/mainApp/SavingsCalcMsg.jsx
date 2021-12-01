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
				id='savings-msg'
				container
				className='input-container'
				direction='row'
				justifyContent='center'
				alignItems='center'
			>
				<Grid item xs={12} sm={6}>
					<Typography variant='h4' component='h2'>
						Quiting for
						{daysQuit === 1
							? ` ${daysQuit} day`
							: ` ${daysQuit} days`}{' '}
						saved you <strong>${savings}!</strong>
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' component='h4'>
						Here's some things you probably never thought about
						buying you can now afford!
					</Typography>
					<Typography variant='body1'>Test 1</Typography>
					<Typography variant='body1'>Test 2</Typography>
					<Typography variant='body1'>Test 3</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default SavingsCalcMsg;
