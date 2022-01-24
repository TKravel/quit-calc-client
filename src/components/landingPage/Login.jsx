import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';
import { UserContext } from '../../context/UserContext';
import DemoMsg from '../demoComponents/DemoMsg';

const Login = () => {
	const { user } = useContext(UserContext);
	const { control, handleSubmit } = useForm();
	const [errors, setErrors] = useState('');
	const { login } = useLogin(errors, setErrors);

	const onSubmit = (data) => {
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
						<>
							<input
								type='text'
								label='Username'
								placeholder='Username'
								name='username'
								value={value}
								onChange={onChange}
							></input>
							<p className='error-msg'>
								{error ? error.message : null}
							</p>
						</>
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
						<>
							<input
								type='text'
								label='Password'
								placeholder='Password'
								name='password'
								value={value}
								onChange={onChange}
							></input>
							<p className='error-msg'>
								{error ? error.message : null}
							</p>
						</>
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

				<button className='button' type='submit'>
					Login
				</button>
			</form>
		</>
	);
};

export default Login;
