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
				<h1>Shopping Cart</h1>

				{cartItems.length === 0 ? (
					<MessageBox>
						Cart is empty. <Link to="/products">Go Shopping</Link>
					</MessageBox>
				) : (
					<ul>
						<div className="row border-top-bottom">
							<div className="item-label">
								<h2>Item</h2>
							</div>
							<div className="price-label">
								<h2>Price</h2>
							</div>
							<div className="quantity-label">
								<h2>Quantity</h2>
							</div>
						</div>
						{cartItems.map((item) => (
							<li key={item.product} className="border">
								<div className="row">
									<div>
										<img
											src={item.image}
											alt={item.name}
											className="small"
										></img>
									</div>
									<div className="product-item ">
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</div>
									<div>&#8369; {item.price}</div>
									<div>
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
										</select>
									</div>
									<div>
										<button
											type="button"
											onClick={() => removeFromCartHandler(item.product)}
										>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="cart-col-1">
				<div className="card card-body">
					<ul>
						<li>
							<h2>
								Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
								&#8369;
								{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
							</h2>
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
	);
}
