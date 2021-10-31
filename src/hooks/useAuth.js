import { useState } from 'react';

const useAuth = () => {
	const [user, setUser] = useState(true);
	const getUser = () => {};

	const setCookie = () => {};

	const logout = () => {};

	const login = (data) => {
		fetch('localhost:3000', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.cookie) {
					// setCookie
				} else if (result.err) {
					console.log(result.err);
				}
			});
	};

	const register = () => {};

	return {
		user,
		getUser,
		setCookie,
		logout,
		login,
		register,
	};
};

export default useAuth;
