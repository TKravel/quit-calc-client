import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckMarkIcon from '../../icons/CheckMarkIcon';
const useStyles = makeStyles((theme) => ({
	paragraph: {
		justifyContent: 'center',
	},
	checkMark: {
		fontSize: '1em',
	},
}));

const CompletedCard = ({ goalName, goalAmount }) => {
	const classes = useStyles();

	return (
		<>
			<Typography
				className={classes.paragraph}
				variant='h5'
				component='h3'
			>
				<CheckMarkIcon className={classes.checkMark} /> {'   '}
				{goalName}: ${goalAmount}
			</Typography>
		</>
	);
};

export default CompletedCard;
