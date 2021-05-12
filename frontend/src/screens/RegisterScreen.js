import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Password and confirm password are not match');
		} else {
			dispatch(register(name, email, password));
		}
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);
	return (
		<div class="container">
			<div class="form-container">
			  <div class="signin-signup">
				<form action="#" class="sign-in-form" onSubmit={submitHandler}>
					<h2 class="title">Sign up</h2>
						<div>
							{loading && <LoadingBox></LoadingBox>}
							{error && <MessageBox variant="danger">{error}</MessageBox>}
						</div>
						<div class="input-field">
       						<i class="fas fa-user"></i>
							<input
								type="text"
								id="name"
								placeholder="Name"
								required
								onChange={(e) => setName(e.target.value)}
							></input>
						</div>
						<div class="input-field">
       						<i class="fas fa-envelope"></i>
							<input
								type="email"
								id="email"
								placeholder="Email"
								required
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</div>
						<div class="input-field">
       						<i class="fas fa-lock"></i>
							<input
								type="password"
								id="password"
								placeholder="Password"
								required
								onChange={(e) => setPassword(e.target.value)}
							></input>
						</div>
						<div class="input-field">
    						<i class="fas fa-lock"></i>
								<input
									type="password"
									id="confirmPassword"
									placeholder="Confirm password"
									required
									onChange={(e) => setConfirmPassword(e.target.value)}
								></input>
						</div>
							<input class="btn solid" type="submit" value="Register" />	
						<div>
							<label />
								Already have an account?{' '}
								<Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
						</div>
					</form>
				</div>
			</div>
			<div class="panels-container">
    			<div class="panel left-panel">
     				<div class="content">
     					<img src="ui_img/shop.svg" class="cart-image" alt="" />
    				</div>
  				</div>
			</div>
			<div class= "waves">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" 
				d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,117.3C960,117,1056,75,
				1152,48C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,
				320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
			</div>
		</div>
	);
}