import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
	let history = useHistory();
	const [user, setUser] = useState(null);

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

	const logout = async () => {
		await fetch('/user/logout', {
			method: 'GET',
			credentials: 'include',
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.msg === 'logged out') {
					setTimeout(() => 2000);
					setUser(false);
					return () => {
						history.push('/login');
					};
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
