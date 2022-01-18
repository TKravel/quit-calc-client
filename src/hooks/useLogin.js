import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useLogin = (errors, setErrors) => {
	const { setUser } = useContext(UserContext);

	const login = (data) => {
		if (errors) {
			setErrors('');
		}
		fetch(`${process.env.REACT_APP_SERVER}/user/login`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setErrors(data.error);
				} else if (data.msg === 'granted') {
					setUser(true);
				}
			})
			.catch((err) => {
				console.log('error: ' + err);
				setErrors('Server error, Please try again later.');
			});
	};

	const register = (data) => {
		if (errors) {
			setErrors('');
		}
		fetch(`${process.env.REACT_APP_SERVER}/user/register`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setErrors(data.error);
				} else if (data.msg === 'granted') {
					setUser(true);
				}
			})
			.catch((err) => {
				console.log('error: ' + err);
				setErrors('Server error, Please try again later.');
			});
	};

	return {
		login,
		register,
	};
};

export default useLogin;
