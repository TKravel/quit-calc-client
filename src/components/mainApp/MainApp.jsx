import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateInput from './DateInput';

const MainApp = () => {
	const date = new Date();
	const [quitDate, setQuitDate] = useState(date);

	const onChange = (value) => {
		setQuitDate(value);
		console.log(value, quitDate);
	};
	return (
		<div className='app-container'>
			<div className='date-container'>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						onChange={onChange}
						value={quitDate}
						format='MM/dd/yyyy'
					/>
				</MuiPickersUtilsProvider>
			</div>
			<div className='savings-container'>savings</div>
			<div className='goal-container'>goals</div>
		</div>
	);
};

export default MainApp;
