import React from 'react';

import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	nav: {
		justifyContent: 'flex-end',
		backgroundColor: theme.palette.primary.extraDark,
	},
}));

const NavBar = () => {
	const classes = useStyles();
	return (
		<>
			<AppBar />
			<Toolbar className={classes.nav}>
				<Button variant='outlined' color='secondary'>
					Login
				</Button>
			</Toolbar>
		</>
	);
};

export default NavBar;
