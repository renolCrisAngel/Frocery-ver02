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
			<div className="form-container">
				<div className="wrapper">
					<form className="form" onSubmit={submitHandler}>
						<div>
							<h1>Payment Method</h1>
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
