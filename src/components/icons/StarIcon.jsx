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

const StarIcon = () => {
	const { user } = useContext(UserContext);
	const classes = useStyles();
	const handleDelete = () => {
		// const data = {
		// 	item: item,
		// };

		// fetch('/goals/delete_goal', {
		// 	method: 'POST',
		// 	credentials: 'include',
		// 	headers: {
		// 		'Content-type': 'application/json; charset=UTF-8',
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		if (data.error) {
		// 			console.log(data.error);
		// 			// Display error to user
		// 		}
		// 		if (data.msg === 'success') {
		// 			console.log('Item removed from goal array');
		// 			handleGoals(data.goalArr.goals);
		// 			handleCount(data.count);
		// 		}
		// 	});

		console.log('item');
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
