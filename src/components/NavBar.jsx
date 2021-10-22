import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	nav: {
		justifyContent: 'space-between',
		backgroundColor: theme.palette.primary.extraDark,
	},
	link: {
		textDecoration: 'none',
		color: '#fff',
	},
	btnLink: {
		textDecoration: 'none',
		color: '#000',
	},
}));

const NavBar = () => {
	const classes = useStyles();
	return (
		<>
			<AppBar />
			<Toolbar className={classes.nav}>
				<Link to='/' className={classes.link}>
					Calculator
				</Link>
				<Button variant='contained' color='secondary'>
					<Link to='/login' className={classes.btnLink}>
						Login
					</Link>
				</Button>
			</Toolbar>
		</>
	);
};

export default NavBar;
