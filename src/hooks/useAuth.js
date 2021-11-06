import { useEffect, useState } from 'react';

const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch('/user/verify_user', {
			method: 'GET',
			credentials: 'include',
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.msg === 'granted') {
					console.log('granted');
					setUser(true);
				} else if (data.msg === 'denied') {
					console.log('false');
					setUser(false);
				}
			})
			.catch((error) => {
				console.log('error: ' + error);
			});
	}, []);

	const logout = () => {
		fetch('/user/logout', {
			method: 'GET',
			credentials: 'include',
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.msg === 'logged out') {
					console.log('logged out');
					setUser(false);
				}
			})
			.catch((error) => {
				console.log('Error logging out: ' + error);
			});
	};

	return {
		user,
		setUser,
		logout,
	};
};

export default useAuth;
