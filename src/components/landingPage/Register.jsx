import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';
import { UserContext } from '../../context/UserContext';
import DemoMsg from '../demoComponents/DemoMsg';

const Register = () => {
	const { user } = useContext(UserContext);
	const { control, handleSubmit } = useForm();
	const [errors, setErrors] = useState('');
	const { register } = useLogin(errors, setErrors);

	const onSubmit = (data) => {
		register(data);
	};

	if (user) {
		return <Redirect to='/' />;
	}
	return (
		<>
			<DemoMsg />
			<form>
				<p>Register</p>
				<p>
					Have a account?
					<br />
					<Link to='/login'>Login here</Link>!
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
							<p>{error ? error.message : null}</p>
						</>
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
						<>
							<input
								type='email'
								label='Email'
								placeholder='Email'
								name='email'
								value={value}
								onChange={onChange}
							></input>
							<p>{error ? error.message : null}</p>
						</>
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
						<>
							<input
								type='text'
								name='password'
								label='Create a password'
								placeholder='Password'
								value={value}
								onChange={onChange}
							></input>
							<p>{error ? error.message : null}</p>
						</>
					)}
					rules={{
						required: 'Password required',
					}}
				/>

				{errors && <p>{errors}</p>}

				<button type='submit'>Register</button>
			</form>
		</>
	);
};

export default Register;
