import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.secondary.main,
		fontSize: '2.5em',
	},
}));

const CheckMarkIcon = () => {
	const classes = useStyles();

	return (
		<SvgIcon className={classes.icon}>
			<path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
		</SvgIcon>
	);
};

export default CheckMarkIcon;
