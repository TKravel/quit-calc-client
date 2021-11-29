import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context/UserContext';

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
	const history = useHistory();
	const { user, logout } = useContext(UserContext);

	const handleClick = async () => {
		await logout();
		history.push('/login');
	};

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
						onClick={handleClick}
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
