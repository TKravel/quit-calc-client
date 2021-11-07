import { useContext } from 'react';
import { UserContext } from './UserContext';

const useAuth = (errors, setErrors) => {
	const { user, setUser } = useContext(UserContext);

	const login = (data) => {
		console.log('login' + JSON.stringify(data));
		if (errors) {
			setErrors('');
		}
		fetch('/user/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.error) {
					setErrors(data.error);
				} else if (data.msg === 'granted') {
					setUser(true);
				}
			})
			.catch((err) => {
				console.log('error: ' + err);
			});
	};

	const register = (data) => {
		if (errors) {
			setErrors('');
		}
		console.log('Reg' + JSON.stringify(data));

		fetch('/user/register', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data.error) {
					setErrors(data.error);
				} else if (data.msg === 'granted') {
					setUser(true);
				}
			})
			.catch((err) => {
				console.log('error: ' + err);
				setErrors('500 - Internal server error');
			});
	};

	return {
		login,
		register,
	};
};

export default useAuth;
