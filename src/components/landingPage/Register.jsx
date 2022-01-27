import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';
import { UserContext } from '../../context/UserContext';
import DemoMsg from '../demoComponents/DemoMsg';
import { Spinner } from '../icons/Spinner';

const Register = () => {
	const { user } = useContext(UserContext);
	const { control, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState('');
	const { register } = useLogin(errors, setErrors, setIsLoading);

	const onSubmit = (data) => {
		setIsLoading(true);
		register(data);
	};

	if (user) {
		return <Redirect to='/' />;
	}
	return (
		<>
			<DemoMsg />
			<form className='user-forms' onSubmit={handleSubmit(onSubmit)}>
				<h1>Register</h1>
				<p>
					Have a account?
					<br />
					<Link to='/login'>Login here!</Link>
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
							margin='normal'
							size='small'
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
					name='email'
					control={control}
					defaultValue=''
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<TextField
							type='email'
							label='Email'
							placeholder='Email'
							name='email'
							value={value}
							onChange={onChange}
							autoComplete='off'
							margin='normal'
							size='small'
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
						required: 'Email required',
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
							name='password'
							label='Create a password'
							placeholder='Password'
							value={value}
							onChange={onChange}
							autoComplete='off'
							margin='normal'
							size='small'
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
					}}
				/>

				{errors && <p className='error-msg'>{errors}</p>}

				{isLoading ? (
					<Spinner styles='form-spinner' />
				) : (
					<button className='button' type='submit'>
						REGISTER
					</button>
				)}
			</form>
		</>
	);
};

export default Register;
