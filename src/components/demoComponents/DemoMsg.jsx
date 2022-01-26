import React, { useContext, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import useDemo from '../../hooks/useDemo';
import { UserContext } from '../../context/UserContext';
import { InfoIcon } from '../icons/InfoIcon';

const DemoMsg = () => {
	const { user } = useContext(UserContext);
	const { createDemoUser } = useDemo();
	const [isOpen, setIsOpen] = useState(true);
	const toggleMsg = (e) => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const handleClick = (e) => {
		createDemoUser();
	};

	if (user) {
		return null;
	}

	if (isOpen) {
		return (
			<div className='demo-msg-container'>
				<CloseIcon styles='close-demo-btn' onClick={toggleMsg} />
				<p>
					To view as a user click the button below to create a demo
					user account
				</p>
				<button className='demo-btn' onClick={handleClick}>
					DEMO
				</button>
			</div>
		);
	} else {
		return (
			<div className='minimized-demo' onClick={toggleMsg}>
				<InfoIcon styles='demo-info-icon' />
			</div>
		);
	}
};

export default DemoMsg;
