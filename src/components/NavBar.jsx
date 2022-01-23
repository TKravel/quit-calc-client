import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
	const history = useHistory();
	const { user, logout } = useContext(UserContext);

	const handleClick = async () => {
		await logout();
		history.push('/login');
	};

	return (
		<>
			<nav className='nav'>
				<Link to='/'>Calculator</Link>
				{user ? (
					<button to='/login' onClick={handleClick}>
						Log out
					</button>
				) : (
					<button to='/login' onClick={handleClick}>
						Login
					</button>
				)}
			</nav>
		</>
	);
};

export default NavBar;
