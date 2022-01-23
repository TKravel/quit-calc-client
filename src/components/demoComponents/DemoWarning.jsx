import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import React, { useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import ExpandIcon from '../icons/ExpandIcon';

const DemoWarning = () => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleMsg = (e) => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	if (isOpen) {
		return (
			<div>
				<CloseIcon handleMsg={toggleMsg} />
				<p>Demo User and data created.</p>
				<p>
					Demo data will be lost upon logout. Please register if you
					wish to persist data in future sessions.
				</p>
			</div>
		);
	} else {
		return (
			<div>
				<ExpandIcon handleMsg={toggleMsg} />
				<p>Important demo warning</p>
			</div>
		);
	}
};

export default DemoWarning;
