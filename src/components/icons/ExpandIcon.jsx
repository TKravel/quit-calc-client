import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	icon: {
		position: 'absolute',
		top: '.2em',
		right: '.2em',
		fontSize: '1em',
	},
}));

const ExpandIcon = ({ handleMsg }) => {
	const classes = useStyles();

	return (
		<SvgIcon className={classes.icon} onClick={handleMsg}>
			<path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z' />
		</SvgIcon>
	);
};

export default ExpandIcon;
