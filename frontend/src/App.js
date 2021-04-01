import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
function App() {
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<a className="brand" href="index.html">
							Frocery
						</a>
					</div>
					<div>
						<a href="cart.html">Cart</a>
						<a href="signin.html">Sign In</a>
					</div>
				</header>
				<main>
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
