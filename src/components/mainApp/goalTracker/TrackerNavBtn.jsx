import React from 'react';

export const TrackerNavBtn = ({ id, text, currentPage, setPage }) => {
	const handleClick = (e) => {
		setPage(e.target.id);
	};

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
