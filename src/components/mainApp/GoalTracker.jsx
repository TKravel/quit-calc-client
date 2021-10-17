import React, { useState } from 'react';
import { Container, Box, AppBar, Tab, Tabs } from '@material-ui/core';

const GoalTracker = ({ calculations }) => {
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`full-width-tabpanel-${index}`}
				aria-labelledby={`full-width-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 1, width: 1 }}>{children}</Box>
				)}
			</div>
		);
	}

	// TabPanel.propTypes = {
	// 	children: PropTypes.node,
	// 	index: PropTypes.number.isRequired,
	// 	value: PropTypes.number.isRequired,
	// };

	// function a11yProps(index) {
	// 	return {
	// 		id: `full-width-tab-${index}`,
	// 		'aria-controls': `full-width-tabpanel-${index}`,
	// 	};
	// }

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container sx={{ width: 1, px: 0 }} className='goal-container'>
			<AppBar position='static'>
				<Tabs value={value} variant='fullWidth' onChange={handleChange}>
					<Tab label='Mile Stones' />
					<Tab label='Personal goals' />
				</Tabs>
			</AppBar>
			<TabPanel sx={{ width: 1 }} value={value} index={0}>
				<p>goal 1: $100.00</p>
				<p>
					Progress:{' '}
					{parseFloat((calculations.savings / 100.0) * 100).toFixed(
						1
					) + '%'}
				</p>
				<p>Goal 2: $500</p>
				<p>
					Progress:{' '}
					{parseFloat((calculations.savings / 500.0) * 100).toFixed(
						1
					) + '%'}
				</p>
				<p>Goal 3: $1000</p>
				<p>
					Progress:{' '}
					{parseFloat((calculations.savings / 1000.0) * 100).toFixed(
						1
					) + '%'}
				</p>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<p>TBD</p>
			</TabPanel>
		</Container>
	);
};

export default GoalTracker;
