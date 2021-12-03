import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useDemo = () => {
	const { setUser } = useContext(UserContext);
	const createDemoUser = async () => {
		await fetch('/demo/createDemoUser', {
			method: 'GET',
			credentials: 'include',
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				}
				if (data.msg === 'Success') {
					console.log('Demo user created');
					localStorage.setItem('demoUser', 'true');
					setUser(true);
				}
			})
			.catch((err) => {
				if (err) {
					console.log(err);
				}
			});
	};

	return { createDemoUser };
};

export default useDemo;
