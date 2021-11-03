import { useState } from 'react';

const useAuth = (setErrors) => {
	const [user, setUser] = useState(true);
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
		// fetch('localhost:3000', {
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// })
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		if (result.cookie) {
		// 			// setCookie
		// 		} else if (result.err) {
		// 			console.log(result.err);
		// 		}
		// 	});
	};

	const register = () => {};

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
