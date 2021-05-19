import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import validator from 'validator';

export default function SigninScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/products';

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		// TODO: sign in action
		dispatch(signin(email, password));
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);

	const [emailError, setEmailError] = useState('')
	const [fontColor, setColor] = useState('');
  	const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email ')
	  setColor('green');
	  setEmail(email)
    } else {
      setEmailError('Enter valid Email!')
	  setColor('red');
    }
  }
	return (
		<div class="container">
	 		 <div class="forms-container">
	 		  	<div class="signin-signup">
	 		   		<form action="#" class="sign-in-form" onSubmit={submitHandler}>
	 				<h2 class="title">Sign in</h2>
	 				<div>
	 					{loading && <LoadingBox></LoadingBox>}
	 					{error && <MessageBox variant="danger">{error}</MessageBox>}
	 				</div>
	 				<div class="input-field">
	 					<i class="fas fa-user"></i>
	 					<input
							type="email"
							id="email"
							placeholder="Email"
							required
							onChange={(e) => validateEmail(e)}
							// onChange={(e) => setEmail(e.target.value)}
						></input> <br/>
						<span style={{
						  color: fontColor,
						}}>{emailError}</span>
					</div>
					<br/>
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
						<input class="btn solid" type="submit" value="Login" />	
					</form>
					 <div class = "new-acct">
						New customer?{' '}
						<Link to={`/register?redirect=${redirect}`}>
							Create your account
						</Link>
					</div>
 		   		</div>
  	 		</div>
			<div class="panels-container">
    			<div class="panel left-panel">
     				<div class="content">
     					<img class="cart-image" src="ui_img/shop.svg" alt="" />
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