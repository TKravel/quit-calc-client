import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useDemo = (setIsLoading, setError) => {
	const { setUser } = useContext(UserContext);
	const createDemoUser = async () => {
		await fetch(`${process.env.REACT_APP_SERVER}/demo/createDemoUser`, {
			method: 'GET',
			credentials: 'include',
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error);
					setError('Error creating user, try again later');
					setIsLoading(false);
				}
				if (data.msg === 'Success') {
					localStorage.setItem('demoUser', 'true');
					setUser(true);
				}
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					setIsLoading(false);
					setError('Error: Please try again later');
				}
			});
	};

	return { createDemoUser };
};

export default useDemo;
