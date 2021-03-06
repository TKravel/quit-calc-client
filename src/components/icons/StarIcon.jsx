import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import CheckMarkIcon from './CheckMarkIcon';

const StarIcon = ({
	goalName,
	goalAmount,
	handleCompletion,
	errors,
	setErrors,
}) => {
	const { user } = useContext(UserContext);
	const collectGoal = () => {
		if (errors !== '') {
			setErrors('');
		}
		handleCompletion(goalName, goalAmount);
	};

	if (user) {
		return (
			<svg
				className='star-button'
				onClick={collectGoal}
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
			>
				<path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z' />
			</svg>
		);
	} else {
		return <CheckMarkIcon />;
	}
};

export default StarIcon;
