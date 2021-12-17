import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		top: '.2em',
		right: '.2em',
		borderRadius: '50%',
		width: '1.1em',
		height: '1.1em',
	},
	icon: {
		position: 'absolute',
		top: '.2em',
		right: '.2em',
		fontSize: '1em',
	},
}));

const CloseIcon = ({ handleMsg }) => {
	const classes = useStyles();

	return (
		<SvgIcon className={classes.icon} onClick={handleMsg}>
			<path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z' />
		</SvgIcon>
	);
};

export default CloseIcon;
