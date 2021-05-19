import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
	const orderId = props.match.params.id;
	const [sdkReady, setSdkReady] = useState(false);

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const orderPay = useSelector((state) => state.orderPay);
	const {
		loading: loadingPay,
		error: errorPay,
		success: successPay,
	} = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const {
		loading: loadingDeliver,
		error: errorDeliver,
		success: successDeliver,
	} = orderDeliver;

	const dispatch = useDispatch();
	useEffect(() => {
		const addPayPalScript = async () => {
			const { data } = await Axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (
			!order ||
			successPay ||
			successDeliver ||
			(order && order._id !== orderId)
		) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(detailsOrder(orderId));
		} else {
			if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript();
				} else {
					setSdkReady(true);
				}
			}
		}
	}, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(order, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order._id));
	};

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<h1>Order ID: {order._id}</h1>
			<div className="row top">
				<div className="cart-col-2">
					<ul>
						<li>
							<div className="carddetails">
								<span class="fas fa-shipping-fast"></span> <b>Delivery Details</b>
								<p>
									<strong>Name:</strong> {order.shippingAddress.fullName} <br/>
									<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1DsxjvdOfxmmb-s8eZbbcoQA-TpRoGYzM&z=13.5" width="800" height="480"></iframe> <br/>
									<strong>Address: </strong> {order.shippingAddress.address},
									{order.shippingAddress.city},{' '}
									{order.shippingAddress.postalCode}, {' '}
									{order.shippingAddress.country}

								{order.isDelivered ? (
									<MessageBox variant="success">
										Delivered at {order.deliveredAt}
									</MessageBox>
								) : (
									<MessageBox variant="danger">Not Delivered</MessageBox>
								)}
									<strong>Payment Method:</strong> {order.paymentMethod}
								{order.isPaid ? (
									<MessageBox variant="success">
										Paid at {order.paidAt}
									</MessageBox>
								) : (
									<MessageBox variant="danger">Not Paid</MessageBox>
								)}
								</p>
							</div>
						</li>
								
						<table class="styled-table">
						<thead>
							<tr>
								<th><span class="fas fa-shopping-cart"></span> <b>Order Details</b></th>
							</tr>
						</thead>
						<tbody>
							{order.orderItems.map((item) => (
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
						</ul>
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
									<div>&#8369;{order.itemsPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Shipping</div>
									<div>&#8369;{order.shippingPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Tax</div>
									<div>&#8369;{order.taxPrice.toFixed(2)}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong> Order Total</strong>
									</div>
									<div>
										<strong>&#8369;{order.totalPrice.toFixed(2)}</strong>
									</div>
								</div>
							</li>
							{!order.isPaid && (
								<li>
									{!sdkReady ? (
										<LoadingBox></LoadingBox>
									) : (
										<>
											{errorPay && (
												<MessageBox variant="danger">{errorPay}</MessageBox>
											)}
											{loadingPay && <LoadingBox></LoadingBox>}

											<PayPalButton
												amount={order.totalPrice}
												onSuccess={successPaymentHandler}
											></PayPalButton>
										</>
									)}
								</li>
							)}
							{userInfo.isAdmin && order.isPaid && !order.isDelivered && (
								<li>
									{loadingDeliver && <LoadingBox></LoadingBox>}
									{errorDeliver && (
										<MessageBox variant="danger">{errorDeliver}</MessageBox>
									)}
									<button
										type="button"
										className="primary block"
										onClick={deliverHandler}
									>
										Deliver Order
									</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
