import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../hooks/UserContext';

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
	const { user, logout } = useContext(UserContext);

	return (
		<>
			<AppBar />
			<Toolbar className={classes.nav}>
				<Link to='/' className={classes.link}>
					Calculator
				</Link>
				{user ? (
					<Button
						component={Link}
						to='/login'
						variant='contained'
						color='secondary'
						onClick={logout}
					>
						Log out
					</Button>
				) : (
					<Button
						component={Link}
						to='login'
						variant='contained'
						color='secondary'
					>
						Login
					</Button>
				)}
			</Toolbar>
		</>
	);
};

export default NavBar;
