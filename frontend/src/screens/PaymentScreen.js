import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress.address) {
		props.history.push('/shipping');
	}
	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		props.history.push('/placeorder');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<div class="form-container">
			  <div class="ship-screen">
				<form action="#" class="sign-in-form" onSubmit={submitHandler}>
						<div>
							<h2 class= "title">Payment Method</h2>
						</div>
						<div>
							<div>
								<input
									type="radio"
									id="paypal"
									value="PayPal"
									name="paymentMethod"
									required
									checked
									onChange={(e) => setPaymentMethod(e.target.value)}
								></input>
								<label htmlFor="paypal">PayPal</label>
							</div>
						</div>
						<div>
							<div>
								<input
									type="radio"
									id="stripe"
									value="Cash On Delivery"
									name="paymentMethod"
									required
									onChange={(e) => setPaymentMethod(e.target.value)}
								></input>
								<label htmlFor="CashOnDelivery">Cash On Delivery</label>
							</div>
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
