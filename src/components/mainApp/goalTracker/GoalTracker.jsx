import React, { useState, useContext, useEffect } from 'react';
import {
	Container,
	AppBar,
	Grid,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoalCard from '../goalTracker/GoalCard';
import GoalInput from '../goalTracker/GoalInput';
import { UserContext } from '../../../context/UserContext';
import { CalcDataContext } from '../../../context/CalcDataContext';
import TrashIcon from '../goalTracker/TrashIcon';

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
	const [completedGoals, setCompletedGoals] = useState([]);
	const [goalCount, setGoalCount] = useState(0);
	const [isDisabled, setIsDisabled] = useState(false);

	const handleFreeGoals = (goal, cost) => {
		const userGoal = goal;
		const userCost = parseFloat(cost);
		setUserGoals([
			{
				goal: userGoal,
				goalCost: userCost,
			},
		]);
		setGoalCount(1);
		setIsDisabled(true);
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

	function compare(a, b) {
		if (parseFloat(a.goalCost) < parseFloat(b.goalCost)) {
			return -1;
		}
		if (parseFloat(a.goalCost) > parseFloat(b.goalCost)) {
			return 1;
		}
		return 0;
	}

	useEffect(() => {
		if (user) {
			fetch('/goals/get_goals', {
				method: 'GET',
				credentials: 'include',
			})
				.then((responce) => responce.json())
				.then((data) => {
					if (data.error) {
						console.log(data.error);
						//Display error to user
					}
					if (data.msg === 'none') {
						console.log('No goals yet');
						setGoalCount(0);
						//Display create goal msg
					} else if (data.docs) {
						setGoalCount(data.count);
						setUserGoals((prevValue) => {
							return [...prevValue, ...data.docs[0].goals];
						});
						setCompletedGoals((prevValue) => {
							return [
								...prevValue,
								...data.docs[0].completedGoals,
							];
						});
					}
				})
				.catch((err) => {
					console.log('error: ' + err);
				});
		}
	}, [user]);

	useEffect(() => {
		if (user && goalCount !== 0) {
			if (goalCount >= 3) {
				setIsDisabled(true);
			} else if (goalCount < 3) {
				setIsDisabled(false);
			}
		}
	}, [user, goalCount]);

	return (
		<Container className={classes.goalContainer}>
			<AppBar position='static'>
				<Tabs value={value} variant='fullWidth' onChange={handleChange}>
					<Tab label='Milestones' />
					<Tab label='Personal goals' />
					<Tab label='Completed goals' />
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
							handleFreeGoal={handleFreeGoals}
							handleUserGoals={setUserGoals}
							handleGoalCount={setGoalCount}
						/>
					</Grid>
					{userGoals.length !== 0 &&
						userGoals.sort(compare).map((goal, index) => {
							return (
								<Grid item className={classes.card} key={index}>
									<GoalCard
										goalName={goal.goal}
										goalAmount={goal.goalCost}
										calculations={calculations}
									/>
									<TrashIcon
										item={goal.goal}
										handleGoals={setUserGoals}
										handleCount={setGoalCount}
									/>
								</Grid>
							);
						})}
					{!user && goalCount > 0 ? (
						<Grid item className={classes.card}>
							<Typography variant='h5' paragraph>
								Sign up to set more personal goals!
							</Typography>
						</Grid>
					) : null}
				</Grid>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Grid
					className={classes.grid}
					container={true}
					direction='column'
				>
					{!user ? (
						<Grid item className={classes.card}>
							<Typography variant='h5' paragraph>
								Sign up to collect completed goals!
							</Typography>
						</Grid>
					) : null}
					{completedGoals.length !== 0 &&
						completedGoals.sort(compare).map((goal, index) => {
							return (
								<Grid item className={classes.card} key={index}>
									<GoalCard
										goalName={goal.goal}
										goalAmount={goal.goalCost}
										calculations={calculations}
									/>
								</Grid>
							);
						})}
				</Grid>
			</TabPanel>
		</Container>
	);
};

export default GoalTracker;
