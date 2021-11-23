import React, { useContext } from 'react';
import { SvgIcon } from '@material-ui/core';
import { UserContext } from '../../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.secondary.main,
		fontSize: '2.5em',
		'&:hover': {
			fontSize: '2.6em',
			color: theme.palette.secondary.dark,
		},
	},
}));

const StarIcon = ({ goalName, goalAmount, handleCompletion }) => {
	const { user } = useContext(UserContext);
	const classes = useStyles();
	const handleDelete = () => {
		console.log(goalName, goalAmount);
		handleCompletion(goalName, goalAmount);
	};

	if (user) {
		return (
			<SvgIcon onClick={handleDelete} className={classes.icon}>
				<path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z' />
			</SvgIcon>
		);
	} else {
		return null;
	}
};

export default StarIcon;
