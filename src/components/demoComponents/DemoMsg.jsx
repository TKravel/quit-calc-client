import React, { useContext, useState } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '../icons/CloseIcon';
import ExpandIcon from '../icons/ExpandIcon';
import useDemo from '../../hooks/useDemo';
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

const DemoMsg = () => {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { createDemoUser } = useDemo();
	const [isOpen, setIsOpen] = useState(true);
	const toggleMsg = (e) => {
		console.log('clicked');
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const handleClick = (e) => {
		console.log('demo btn clicked');
		createDemoUser();
	};

	if (user) {
		return null;
	}

	if (isOpen) {
		return (
			<Paper className={classes.paper} elevation={8}>
				<CloseIcon
					className={classes.closeIcon}
					handleMsg={toggleMsg}
				/>
				<Typography variant='h6' paragraph>
					To view as a user click the button below to create a demo
					user account
				</Typography>
				<Button
					onClick={handleClick}
					variant='outlined'
					color='inherit'
				>
					Demo
				</Button>
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
					Important demo message
				</Typography>
			</Paper>
		);
	}
};

export default DemoMsg;
