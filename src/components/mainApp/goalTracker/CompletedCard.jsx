import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	paragraph: {
		justifyContent: 'center',
	},
	list: {
		maxHeight: '40vh',
		overflowY: 'scroll',
	},
	listItem: {
		textAlign: 'center',
	},
}));

const CompletedCard = ({ completed, sortFunc }) => {
	const classes = useStyles();

	if (completed.length === 0) {
		return (
			<Typography variant='h5' paragraph>
				Keep going, collected goals will be displayed here.
			</Typography>
		);
	} else {
		return (
			<>
				<Typography variant='h5' paragraph>
					Congratulations on your achievements!
				</Typography>
				<List className={classes.list}>
					{completed.sort(sortFunc).map((goal, index) => {
						return (
							<ListItem key={index} className={classes.listItem}>
								<ListItemText
									primary={`${goal.goal} ${goal.goalCost}`}
								/>
							</ListItem>
						);
					})}
				</List>
				<Typography variant='h5' paragraph>
					Keep going to collect more goals!
				</Typography>
			</>
		);
	}
};

export default CompletedCard;
