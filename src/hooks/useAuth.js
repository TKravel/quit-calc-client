import { useState } from 'react';

const useAuth = () => {
	const [user, setUser] = useState('');
	const getUser = () => {};

	const setCookie = () => {};

	const logout = () => {};

	const login = (data) => {
		fetch('localhost:3000', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((re