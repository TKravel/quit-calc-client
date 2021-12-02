import React, { useContext } from 'react';
import {
	Paper,
	Typography,
	Grid,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
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
	listItem: {
		textAlign: 'center',
	},
}));

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
						Lets break that down and visualize how it helps you
						monthly.
					</Typography>
					<Typography variant='body1'>
						So far your savings have helped with the following
						bills:
					</Typography>
					<List>
						{monthlySavings.map((arrItem, index) => {
							console.log('Test');
							const thirdOfSavings = calculations.savings / 3;
							const numOfItems = thirdOfSavings / arrItem.cost;
							const item = arrItem.item;
							const monthForm =
								numOfItems <= 1 ? 'months' : "months'";

							return (
								<ListItem key={index}>
									<ListItemText
										className={classes.listItem}
										primary={`${numOfItems.toFixed(
											2
										)} ${monthForm} of ${item}`}
									/>
								</ListItem>
							);
						})}
					</List>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default SavingsCalcMsg;
