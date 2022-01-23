import React, { useContext, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import ExpandIcon from '../icons/ExpandIcon';
import useDemo from '../../hooks/useDemo';
import { UserContext } from '../../context/UserContext';

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
				<CloseIcon style='close-demo-btn' onClick={toggleMsg} />
				<p>
					To view as a user click the button below to create a demo
					user account
				</p>
				<button className='demo-btn' onClick={handleClick}>
					Demo
				</button>
			</div>
		);
	} else {
		return (
			<div className='demo-msg-container'>
				<ExpandIcon style='open-demo-btn' onClick={toggleMsg} />
				<p>Important demo message</p>
			</div>
		);
	}
};

export default DemoMsg;
