import React from 'react';
import { SvgIcon } from '@material-ui/core';

const TrashIcon = ({ index }) => {
	const handleDelete = (e) => {
		const card = e.currentTarget.getAttribute('index');

		console.log(card);
	};
	return (
		<SvgIcon index={index} onClick={handleDelete}>
			<path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
		</SvgIcon>
	);
};

export default TrashIcon;
