import { useState } from 'react';

const useAuth = () => {
	const [user, setUser] = useState('');
	const verifyUser = () => {};
	const setCookie = () => {};

	const logout = () => {};

	const login = (data) => {};

	const register = () => {};

	return {
		verifyUser,
		setCookie,
		logout,
		login,
		register,
	};
};

export default useAuth;
