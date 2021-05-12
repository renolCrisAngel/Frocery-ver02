import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_SUCCESS } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
	const cart = useSelector((state) => state.cart);
	if (!cart.paymentMethod) {
		props.history.push('/payment');
	}
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;
	const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);
	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const dispatch = useDispatch();
	const placeOrderHandler = () => {
		dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
	};
	useEffect(() => {
		if (success) {
			props.history.push(`/order/${order._id}`);
			dispatch({ type: ORDER_CREATE_SUCCESS });
		}
	}, [dispatch, order, props.history, success]);
	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className="row top">
				<div className="cart-col-2">
					<ul>
						<li>
							<div className="cardorder">
								<span class="fas fa-shipping-fast"></span> <b>Delivery Details</b>
								<p>
									<strong>Name:</strong> {cart.shippingAddress.fullName} <br/>
									<strong>Address: </strong> {cart.shippingAddress.address},
									{cart.shippingAddress.city},{' '}
									{cart.shippingAddress.postalCode}, {' '}
									{cart.shippingAddress.country} <br/>
									<strong>Payment Method: </strong> {cart.paymentMethod}
								</p>
							</div>
						</li>
						</ul>
						<table class="styled-table">
						<thead>
							<tr>
								<th><span class="fas fa-shopping-cart"></span> <b>Order Details</b></th>
							</tr>
						</thead>
						<tbody>
							{cart.cartItems.map((item) => (
								<tr key={item.product} className="border">
									<td>
										<img
											src={item.image}
											alt={item.name}
											className="cart-img"
										></img>
									</td>
									<td>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
											<div>&#8369;{item.price}</div>
												<div>x{item.qty}</div>
									</td>

									<td>		
										<div>
											<h1>
												&#8369;{item.qty * item.price}
											</h1>
										</div>
									</td>
								</tr>
						    ))}
						</tbody>
						</table>
				</div>
				<div className="cart-col-1">
					<div className="card card-body">
						<ul>
							<li>
								<h2>Order Summary</h2>
							</li>
							<li>
								<div className="row">
									<div>Items</div>
										<div>&#8369;{cart.itemsPrice.toFixed(1)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Shipping</div>
										<div>&#8369;{cart.shippingPrice.toFixed(1)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Tax</div>
										<div> &#8369;{cart.taxPrice.toFixed(1)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong>Order Total</strong>
									</div>
									<div>
										<strong>&#8369;{cart.totalPrice.toFixed(1)}</strong>
									</div>
								</div>
							</li>
							<li>
								<button
									type="button"
									onClick={placeOrderHandler}
									className="primary block"
									disabled={cart.cartItems.length === 0}
								>
									Place Order
								</button>
							</li>
							<div>
								{loading && <LoadingBox></LoadingBox>}
								{error && <MessageBox variant="danger"></MessageBox>}
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
