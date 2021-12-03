import React, { useState, useContext } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '../icons/CloseIcon';
import ExpandIcon from '../icons/ExpandIcon';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.warning.light,
		border: '2px solid' + theme.palette.warning.dark,
		width: '80vw',
		padding: '.5em',
		margin: '1em auto 1em auto',
		textAlign: 'center',
		position: 'relative',
	},
}));

const DemoWarning = () => {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(true);

	const demoUser = localStorage.getItem('demoUser');

	const toggleMsg = (e) => {
		console.log('clicked');
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	if (isOpen) {
		return (
			<Paper className={classes.paper} elevation={8}>
				{/* {!demoUser && ( */}
				<CloseIcon
					className={classes.closeIcon}
					handleMsg={toggleMsg}
				/>
				{/* )} */}
				<Typography variant='h6' paragraph>
					Demo User and data created.
				</Typography>
				<Typography variant='h6' paragraph>
					Demo data will be lost upon logout. Please register if you
					wish to persist data in future sessions.
				</Typography>
			</Paper>
		);
	} else {
		return (
			<Paper className={classes.paper} elevation={8}>
				<ExpandIcon
					className={classes.closeIcon}
					handleMsg={toggleMsg}
				/>
				<Typography variant='h6' paragraph>
					Important demo warning
				</Typography>
			</Paper>
		);
	}
};

export default DemoWarning;
