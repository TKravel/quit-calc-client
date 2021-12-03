import { useEffect, useState } from 'react';

const useAuth = () => {
	const [user, setUser] = useState(null);

	const demoUser = localStorage.getItem('demoUser');

	useEffect(() => {
		fetch('/user/verify_user', {
			method: 'GET',
			credentials: 'include',
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.msg === 'granted') {
					setUser(true);
				} else if (data.msg === 'denied') {
					setUser(false);
				}
			})
			.catch((error) => {
				console.log('error: ' + error);
			});
	}, []);

	const verifyUser = () => {
		fetch('/user/verify_user', {
			method: 'GET',
			credentials: 'include',
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.msg === 'granted') {
					setUser(true);
				} else if (data.msg === 'denied') {
					setUser(false);
				}
			})
			.catch((error) => {
				console.log('error: ' + error);
			});
	};

	const logout = async () => {
		await fetch('/user/logout', {
			method: 'GET',
			credentials: 'include',
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.msg === 'logged out') {
					setUser(false);
					console.log('logged out');
				}
				if (demoUser === 'true') {
					localStorage.removeItem('demoUser');
				}
			})
			.catch((error) => {
				console.log('Error logging out: ' + error);
			});
	};

	return {
		user,
		setUser,
		verifyUser,
		logout,
	};
};

export default useAuth;
