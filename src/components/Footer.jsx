import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	footer: {
		textAlign: 'center',
	},
});

const date = new Date();
const currentYear = date.getFullYear();

const Footer = () => {
	const classes = useStyles();

	return (
		<Typography className={classes.footer}>
			TKDev.com &copy; {currentYear}
		</Typography>
	);
};

export default Footer;
