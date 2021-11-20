import React, { useContext } from 'react';
import { SvgIcon } from '@material-ui/core';
import { UserContext } from '../../../context/UserContext';

const TrashIcon = ({ item, handleGoals, handleCount }) => {
	const { user } = useContext(UserContext);
	const handleDelete = () => {
		const data = {
			item: item,
		};

		fetch('/goals/delete_goal', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error);
					// Display error to user
				}
				if (data.msg === 'success') {
					console.log('Item removed from goal array');
					handleGoals(data.goalArr.goals);
					handleCount(data.count);
				}
			});

		console.log(item);
	};

	if (user) {
		return (
			<SvgIcon onClick={handleDelete}>
				<path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
			</SvgIcon>
		);
	} else {
		return null;
	}
};

export default TrashIcon;
