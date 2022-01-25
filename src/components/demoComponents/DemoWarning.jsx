import React from 'react';
import CloseIcon from '../icons/CloseIcon';

const DemoWarning = () => {
	const demoMsg = document.getElementById('demo-selector');

	const hideMsg = () => {
		demoMsg.style.display = 'none';
	};

	return (
		<div id='demo-selector' className='demo-msg-container'>
			<CloseIcon style='close-demo-btn' onClick={hideMsg} />
			<p>Demo User and data created.</p>
			<p>
				Demo data will be lost upon logout. Please register if you wish
				to persist data in future sessions.
			</p>
		</div>
	);
};

export default DemoWarning;
