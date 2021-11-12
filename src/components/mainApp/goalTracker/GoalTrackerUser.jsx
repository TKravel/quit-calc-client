import React, { useState, useContext } from 'react';
import {
	Container,
	AppBar,
	Grid,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoalCard from './GoalCard';
import GoalInput from './GoalInput';
import { UserContext } from '../../hooks/UserContext';
import { CalcDataContext } from '../../context/CalcDataContext';

const useStyles = makeStyles((theme) => ({
	goalContainer: {
		color: '#000',
		backgroundColor: theme.palette.primary.main,
		maxWidth: '800px',
		minHeight: '100vh',
		margin: '1em auto 0 auto',
		padding: '0px',
		justifyContent: 'center',
		boxShadow:
			'0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
	},
	grid: {
		minHeight: '100vh',
		justifyContent: 'space-around',
	},
	card: {
		color: '#000',
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

const GoalTracker = () => {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { calculations } = useContext(CalcDataContext);
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
	const [userGoals, setUserGoals] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);

	const handleUserGoals = (goal, cost) => {
		const userGoal = goal;
		const userCost = parseFloat(cost);
		setUserGoals([
			{
				goal: userGoal,
				cost: userCost,
			},
		]);
	};
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
					<Tab label='Milestones' />
					<Tab label='Personal goals' />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Grid
					className={classes.grid}
					container={true}
					direction='column'
				>
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
				<Grid
					className={classes.grid}
					container={true}
					direction='column'
				>
					<Grid item className={classes.card}>
						<GoalInput
							disabled={isDisabled}
							setDisabled={setIsDisabled}
							userGoals={userGoals}
							handleGoals={handleUserGoals}
						/>
					</Grid>
					{userGoals.length !== 0 &&
						userGoals.map((goal, index) => {
							return (
								<Grid item className={classes.card} key={index}>
									<GoalCard
										goalName={goal.goal}
										goalAmount={goal.cost}
										calculations={calculations}
									/>
								</Grid>
							);
						})}
					{!user && (
						<Grid item className={classes.card}>
							<Typography variant='h5' paragraph>
								Sign up to set more personal goals!
							</Typography>
						</Grid>
					)}
				</Grid>
			</TabPanel>
		</Container>
	);
};

export default GoalTracker;