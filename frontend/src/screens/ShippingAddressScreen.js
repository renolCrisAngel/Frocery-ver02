import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!userInfo) {
		props.history.push('/signin');
	}

	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddress({ fullName, address, city, postalCode, country })
		);
		props.history.push('/payment');
	};
	return (
		<div>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<div class="form-container">
			  <div class="ship-screen">
				<form action="#" class="sign-in-form" onSubmit={submitHandler}>
						<div>
							<h2 class="title">Shipping Address</h2>
						</div>
						<div class="input-field">
       						<i class="fas fa-user"></i>
							<input
								type="text"
								id="fullName"
								placeholder="Full Name"
								// value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required
							/>
						</div>
						<div class="input-field">
       						<i class="fas fa-address-card"></i>
							<input
								type="text"
								id="address"
								placeholder="Address"
								// value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							></input>
						</div>
						<div class="input-field">
       						<i class="fas fa-city"></i>
							<input
								type="text"
								id="city"
								placeholder="City"
								// value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							></input>
						</div>
						<div class="input-field">
       						<i class="fas fa-map-pin"></i>
							<input
								type="text"
								id="postalCode"
								placeholder="Postal Code"
								// value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								required
							></input>
						</div>
						<div class="input-field">
       						<i class="fas fa-flag"></i>
							<input
								type="text"
								id="country"
								placeholder="Country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							></input>
						</div>
						<div>
							<label />
							<button className="primary" type="submit">
								Continue
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
