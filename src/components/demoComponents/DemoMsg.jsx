import React, { useContext, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import useDemo from '../../hooks/useDemo';
import { UserContext } from '../../context/UserContext';
import { InfoIcon } from '../icons/InfoIcon';
import { Spinner } from '../icons/Spinner';

const DemoMsg = () => {
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { createDemoUser } = useDemo(setIsLoading, setError);
	const [isOpen, setIsOpen] = useState(true);
	const toggleMsg = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const handleClick = () => {
		if (error !== '') {
			setError('');
		}
		setIsLoading(true);
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
				{isLoading ? (
					<Spinner styles='form-spinner' />
				) : (
					<button className='demo-btn' onClick={handleClick}>
						DEMO
					</button>
				)}
				{error !== '' && <p className='error-msg'>{error}</p>}
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
