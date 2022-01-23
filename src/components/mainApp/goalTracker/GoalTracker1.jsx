import React, { useState, useEffect, useContext } from 'react';
import { TrackerNavBtn } from './TrackerNavBtn';

export const GoalTracker1 = () => {
	return (
		<div className='tracker-container'>
			<div className='tracker-nav-container'>
				<nav>
					<TrackerNavBtn />
					<TrackerNavBtn />
					<TrackerNavBtn />
				</nav>
				<p>KAbKJAKASSJNKAJSASJDNDKASJNDKAJSNDAKSJNDA</p>
			</div>
			<div className='tracker-display-container'></div>
			<div className='tracker-info-container'></div>
		</div>
	);
};
