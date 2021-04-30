import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
	const productId = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const dispatch = useDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		props.history.push('/signin?redirect=shipping');
	};
	return (
		<div className="row top">
			<div className="cart-col-2">
				<h2 class="title">Shopping Cart</h2>
					{cartItems.length === 0 ? (
					<MessageBox><center>
						Cart is empty. <Link to="/products">Go Shopping</Link></center>
					</MessageBox>
				) : (
					<table class="styled-table">
						<thead>
						<tr>
							<th></th>
							<th>Order Price</th>
							<th>Quantity</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
							<tr key={item.product} className="border">
								<td>
									<img
											src={item.image}
											alt={item.name}
											className="cart-img"
									></img></td>
								<td>
									<Link to={`/product/${item.product}`}>{item.name}</Link>
										<div>&#8369; {item.price}</div></td>
								<td>
									<select
										value={item.qty}
										onChange={(e) =>
											dispatch(
												addToCart(item.product, Number(e.target.value))
											)
										}
									>
										{[...Array(item.countInStock).keys()].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										))}
									</select></td>
								<td>
									<button
											type="button"
											onClick={() => removeFromCartHandler(item.product)}
										>
											Delete
										</button></td>
							</tr>
						))}
					</tbody>
					</table>
					
				)}
				
			</div>
			<div className="cart-col-1">
				<div className="card card-body">
					<div className="subtotal">
						<ul>
							<li>
								<h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): </h2>
									&#8369;
									{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
							</li>
							<li>
								<button
									type="button"
									onClick={checkoutHandler}
									className="primary block"
								disabled={cartItems.length === 0}
							>
								Proceed to Checkout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
