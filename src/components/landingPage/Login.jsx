import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';
import { UserContext } from '../../context/UserContext';
import DemoMsg from '../demoComponents/DemoMsg';
import { Spinner } from '../icons/Spinner';

const Login = () => {
	const { user } = useContext(UserContext);
	const { control, handleSubmit } = useForm();
	const [errors, setErrors] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useLogin(errors, setErrors, setIsLoading);

	const onSubmit = (data) => {
		setIsLoading(true);
		login(data);
	};

	if (user) {
		return <Redirect to='/' />;
	}
	return (
		<>
			<DemoMsg />
			<form className='user-forms' onSubmit={handleSubmit(onSubmit)}>
				<h1>Login</h1>
				<p>
					Not registered?
					<br />
					<Link to='/register'>Sign up here!</Link>
				</p>
				<Controller
					name='username'
					control={control}
					defaultValue=''
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<TextField
							type='text'
							label='Username'
							placeholder='Username'
							name='username'
							value={value}
							onChange={onChange}
							autoComplete='off'
							size='small'
							margin='normal'
							error={error ? true : false}
							helperText={error ? error.message : null}
							InputLabelProps={{
								style: { color: '#999c98' },
							}}
							sx={{
								input: {
									'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
										{
											WebkitAppearance: 'none',
											display: 'none',
										},
									color: '#cdd1cc',
									width: '100% !important',
								},
								'& label.Mui-focused': {
									color: 'white',
								},
								'& .MuiInput-underline:after': {
									borderBottomColor: 'yellow',
								},
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										color: 'white',
										border: 'none',
										borderBottom: '1px solid',
										borderBottomColor: 'white',
										borderRadius: '0',
									},
									'&:hover fieldset': {
										borderColor: 'white',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#0ab377',
									},
								},
							}}
						/>
					)}
					rules={{
						required: 'Username required',
					}}
				/>
				<Controller
					name='password'
					control={control}
					defaultValue=''
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<TextField
							type='text'
							label='Password'
							placeholder='Password'
							name='password'
							value={value}
							onChange={onChange}
							autoComplete='off'
							size='small'
							margin='normal'
							error={error ? true : false}
							helperText={error ? error.message : null}
							InputLabelProps={{
								style: { color: '#999c98' },
							}}
							sx={{
								input: {
									'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
										{
											WebkitAppearance: 'none',
											display: 'none',
										},
									color: '#cdd1cc',
									width: '100% !important',
								},
								'& label.Mui-focused': {
									color: 'white',
								},
								'& .MuiInput-underline:after': {
									borderBottomColor: 'yellow',
								},
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										color: 'white',
										border: 'none',
										borderBottom: '1px solid',
										borderBottomColor: 'white',
										borderRadius: '0',
									},
									'&:hover fieldset': {
										borderColor: 'white',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#0ab377',
									},
								},
							}}
						/>
					)}
					rules={{
						required: 'Password required',
						minLength: {
							value: 6,
							message: 'to short',
						},
					}}
				/>
				{errors && <p className='error-msg'>{errors}</p>}
				{isLoading ? (
					<Spinner styles='form-spinner' />
				) : (
					<button className='button' type='submit'>
						LOGIN
					</button>
				)}
			</form>
		</>
	);
};

export default Login;
