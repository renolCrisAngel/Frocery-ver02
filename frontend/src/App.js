import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import SigninScreen from './screens/SigninScreen';
function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	return (
		<BrowserRouter>
			<div className="grid-container">
				<div className="row"></div>
				<header className="row">
					<div>
						<Link className="brand" to="/">
							Frocery
						</Link>
					</div>
					<div>
						<Link to="/cart">
							Cart
							{cartItems.length > 0 && (
								<span className="badge">{cartItems.length}</span>
							)}
						</Link>
						<Link to="signin.html">Sign In</Link>
					</div>
				</header>
				<main>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/product/:id" component={ProductScreen}></Route>
					<Route path="/products" component={ProductsScreen}></Route>
					<Route path="/" component={HomeScreen} exact></Route>
				</main>
				<footer className="row center">All right reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
