import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SigninScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
		// signin action
	};
	return (
		<div>
			<div className="form-container">
				<div className="wrapper">
					<form className="form" onSubmit={submitHandler}>
						<div>
							<h1 className="text">Sign In</h1>
						</div>
						<div>
							<label htmlFor="email">Email address</label>
							<input
								type="email"
								id="email"
								placeholder="Enter email"
								required
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								placeholder="Enter password"
								required
								onChange={(e) => setPassword(e.target.value)}
							></input>
						</div>
						<div>
							<label />
							<button className="primary" type="submit">
								Sign In
							</button>
						</div>
						<div>
							<label />
							<div>
								New customer? <Link to="/register">Create your account</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
