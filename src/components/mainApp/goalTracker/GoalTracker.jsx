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
import MilestoneCard from './MilestoneCard';
import GoalCard from './GoalCard';
import CompletedCard from './CompletedCard';
import GoalInput from '../goalTracker/GoalInput';
import { UserContext } from '../../../context/UserContext';

const useStyles = makeStyles((theme) => ({
	goalContainer: {
		color: '#000',
		backgroundColor: theme.palette.primary.main,
		maxWidth: '800px',
		minHeight: '600px',
		margin: '1em auto 1em auto',
		padding: '0px',
		alignContent: 'center',
		justifyContent: 'center',
		boxShadow:
			'0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
	},
	grid: {
		minHeight: '100vh',
		justifyContent: 'center',
		textAlign: 'center',
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
	const [errors, setErrors] = useState('');

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

	const handleGoalCompletion = (goal, cost) => {
		if (errors !== '') {
			setErrors('');
		}
		const data = {
			goal: goal,
			cost: cost,
		};
		fetch(`${process.env.REACT_APP_SERVER}/goals/completed_goal`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log('error: ' + data.error);
					setErrors(data.error);
				}
				if (data.msg === 'success') {
					setGoalCount(data.count);
					setUserGoals(() => {
						return [...data.doc.goals];
					});
					setCompletedGoals(() => {
						return [...data.doc.completedGoals];
					});
				}
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					setErrors('Server error, please try again later.');
				}
			});
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
			fetch(`${process.env.REACT_APP_SERVER}/goals/get_goals`, {
				method: 'GET',
				credentials: 'include',
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						console.log(data.error);
					}
					if (data.msg === 'none') {
						setGoalCount(0);
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
								<MilestoneCard
									goalName={goal.goalName}
									goalAmount={goal.goalAmount}
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
					<Typography
						className={classes.error}
						variant='body1'
						paragraph
					>
						Collect completed goals by clicking on the star icon
					</Typography>
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
										handleGoals={setUserGoals}
										handleCount={setGoalCount}
										handleCompletion={handleGoalCompletion}
										errors={errors}
										setErrors={setErrors}
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
					) : (
						<Grid item className={classes.card}>
							<CompletedCard
								completed={completedGoals}
								sortFunc={compare}
							/>
						</Grid>
					)}
				</Grid>
			</TabPanel>
		</Container>
	);
};

export default GoalTracker;
