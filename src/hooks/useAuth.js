import { useState } from 'react';

const useAuth = (errors, setErrors) => {
	const [user, setUser] = useState('');
	const checkUser = () => {
		fetch('localhost:3000/verify_user', {
			method: 'POST',
		})
			.then((responce) => responce.json())
			.then((result) => {
				if (result.status === '200') {
					setUser(true);
				} else {
					setUser(false);
				}
			});
	};

	const logout = () => {};

	const login = (data) => {
		console.log('Test' + JSON.stringify(data));
		setErrors('errrrros');
		fetch('/user/test', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((responce) => responce.json())
			.then((data) => {
				if (data) {
					console.log('Req success');
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
				} else if (data.msg === 'success') {
					setUser(true);
					console.log('user: ' + user);
				}
			})
			.catch((err) => {
				console.log('error: ' + err);
				setErrors('500 - Internal server error');
			});
	};

	return {
		user,
		setUser,
		checkUser,
		logout,
		login,
		register,
	};
};

export default useAuth;
