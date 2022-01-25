import React, { useState, useEffect, useContext } from 'react';
import { TrackerNavBtn } from './TrackerNavBtn';
import { MilestoneCard } from './MilestoneCard';
import { GoalCard } from './GoalCard';
import { CompletedCard } from './CompletedCard';
import { UserContext } from '../../../context/UserContext';
import { CalcDataContext } from '../../../context/CalcDataContext';
import UserInput from '../UserInput';
import GoalInput from './GoalInput';
import { Quote } from './Quote';

const compare = (a, b) => {
	if (parseFloat(a.goalCost) < parseFloat(b.goalCost)) {
		return -1;
	}
	if (parseFloat(a.goalCost) > parseFloat(b.goalCost)) {
		return 1;
	}
	return 0;
};

export const GoalTracker1 = () => {
	const { user } = useContext(UserContext);
	const { calculations, setCalculations } = useContext(CalcDataContext);
	const [errors, setErrors] = useState();
	const [userGoals, setUserGoals] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const [completedGoals, setCompletedGoals] = useState([]);
	const [goalCount, setGoalCount] = useState(0);
	const [activePage, setActivePage] = useState('milestones');
	const defaultGoals = [
		{
			goalName: 'Goal #1',
			goalAmount: 25,
		},
		{
			goalName: 'Goal #2',
			goalAmount: 50,
		},
		{
			goalName: 'Goal #3',
			goalAmount: 100,
		},
		{
			goalName: 'Goal #4',
			goalAmount: 250,
		},
		{
			goalName: 'Goal #5',
			goalAmount: 500,
		},
		{
			goalName: 'Goal #6',
			goalAmount: 1000,
		},
	];

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
		if (completedGoals !== undefined) {
			let spendings = 0;
			completedGoals.forEach((goal) => {
				spendings += parseFloat(goal.goalCost);
			});
			setCalculations((prevValues) => {
				return {
					...prevValues,
					spent: parseFloat(spendings),
				};
			});
		}
	}, [completedGoals]);

	return (
		<div className='tracker-container'>
			<div className='tracker-nav-container'>
				<nav className='tracker-nav'>
					<TrackerNavBtn
						id='milestones'
						text='Milestones'
						currentPage={activePage}
						setPage={setActivePage}
					/>
					<TrackerNavBtn
						id='personal'
						text='Personal'
						currentPage={activePage}
						setPage={setActivePage}
					/>
					<TrackerNavBtn
						id='completed'
						text='Completed'
						currentPage={activePage}
						setPage={setActivePage}
					/>
				</nav>
				<Quote />
			</div>
			<div className='tracker-display-container'>
				{activePage === 'milestones' && (
					<div className='milestone-container'>
						{defaultGoals.map((goal, index) => {
							return (
								<MilestoneCard
									key={index}
									idx={index}
									goalName={goal.goalName}
									goalAmount={goal.goalAmount}
								/>
							);
						})}
					</div>
				)}
				{activePage === 'personal' && (
					<div className='personal-container'>
						<GoalInput
							handleFreeGoal={handleFreeGoals}
							handleUserGoals={setUserGoals}
							handleGoalCount={setGoalCount}
						/>
						{userGoals.length !== 0 &&
							userGoals.sort(compare).map((goal, index) => {
								return (
									<GoalCard
										key={index}
										goalName={goal.goal}
										goalAmount={goal.goalCost}
										handleGoals={setUserGoals}
										handleCount={setGoalCount}
										handleCompletion={handleGoalCompletion}
										errors={errors}
										setErrors={setErrors}
									/>
								);
							})}
					</div>
				)}
				{activePage === 'completed' && (
					<div className='completed-container'>
						{!user ? (
							<p>Sign up to collect completed goals!</p>
						) : (
							<CompletedCard
								completed={completedGoals}
								sortFunc={compare}
							/>
						)}
					</div>
				)}
			</div>
			<div className='tracker-info-container'>
				<div className='info-form'>
					<UserInput
						styles='edit-form'
						headerText='Edit'
						buttonText='Edit'
					/>
				</div>
				<div className='info-totals'>
					<p>
						Savings: $
						<span>
							{calculations !== undefined
								? calculations.savings
								: null}
						</span>
					</p>

					<p className='info-spent'>
						Spent: $
						<span>{parseFloat(calculations.spent).toFixed(2)}</span>
					</p>

					<p className='info-balance'>
						Balance: $
						<span>
							{parseFloat(
								calculations.savings - calculations.spent
							).toFixed(2)}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};
