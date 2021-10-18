import React, { useState } from 'react';
import { Container, AppBar, Grid, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoalCard from './GoalCard';

const useStyles = makeStyles((theme) => ({
	goalContainer: {
		backgroundColor: theme.palette.primary.main,
		maxWidth: '800px',
		margin: 'auto',
		padding: '0px',
		boxShadow:
			'0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
	},
	card: {
		backgroundColor: theme.palette.primary.light,
		display: 'block',
		padding: '0px',
		margin: '5px',
		alignSelf: 'center',
		textAlign: 'center',
		width: '300px',
		borderRadius: '8px',
		boxShadow:
			'0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
	},
}));

const GoalTracker = ({ calculations }) => {
	const classes = useStyles();
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`full-width-tabpanel-${index}`}
				aria-labelledby={`full-width-tab-${index}`}
				{...other}
			>
				{value === index && <Container>{children}</Container>}
			</div>
		);
	}

	// TabPanel.propTypes = {
	// 	children: PropTypes.node,
	// 	index: PropTypes.number.isRequired,
	// 	value: PropTypes.number.isRequired,
	// };

	// function a11yProps(index) {
	// 	return {
	// 		id: `full-width-tab-${index}`,
	// 		'aria-controls': `full-width-tabpanel-${index}`,
	// 	};
	// }

	const [value, setValue] = useState(0);
	const defaultGoals = [
		{
			goalName: 'Goal #1',
			goalAmount: 100,
		},
		{
			goalName: 'Goal #2',
			goalAmount: 500,
		},
		{
			goalName: 'Goal #3',
			goalAmount: 1000,
		},
	];

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container className={classes.goalContainer}>
			<AppBar position='static'>
				<Tabs value={value} variant='fullWidth' onChange={handleChange}>
					<Tab label='Mile Stones' />
					<Tab label='Personal goals' />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Grid container={true} direction='column'>
					{defaultGoals.map((goal, index) => {
						return (
							<Grid item className={classes.card} key={index}>
								<GoalCard
									goalName={goal.goalName}
									goalAmount={goal.goalAmount}
									calculations={calculations}
								/>
							</Grid>
						);
					})}
				</Grid>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Grid container={true} direction='column'>
					<Grid item className={classes.card} key={0}>
						<p>Sign up to set personal goals!</p>
					</Grid>
				</Grid>
			</TabPanel>
		</Container>
	);
};

export default GoalTracker;
