import React from 'react';

export const TrackerNavBtn = ({ id, text, currentPage, setPage }) => {
	const handleClick = (e) => {
		console.log(e.target.id);
		setPage(e.target.id);
	};

	let styles = {};

	if (id === currentPage) {
		styles = {
			borderRight: '5px solid #fff',
		};
	}

	return (
		<button
			id={id}
			type='button'
			className={
				id === currentPage
					? 'tracker-nav-btn-active'
					: 'tracker-nav-btn'
			}
			onClick={handleClick}
		>
			{text}
		</button>
	);
};
