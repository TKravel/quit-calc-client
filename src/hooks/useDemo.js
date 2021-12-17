import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useDemo = () => {
	const { setUser } = useContext(UserContext);
	const createDemoUser = async () => {
		await fetch(
			'https://protected-badlands-62393.herokuapp.com/demo/createDemoUser',
			{
				method: 'GET',
				credentials: 'include',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				}
				if (data.msg === 'Success') {
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
