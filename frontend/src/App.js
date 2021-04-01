import React from 'react';
import Product from './components/Product';
import data from './data';
function App() {
	return (
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
				<div>
					<div className="row center">
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
						<div className="card">
							<img src="https://dummyimage.com/250x100/000/fff.jpg" alt="" />
							<h2>Market</h2>
						</div>
					</div>
					<div className="row center">
						{data.products.map((product) => (
							<Product key={product.id} product={product}></Product>
						))}
					</div>
				</div>
			</main>
			<footer className="row center">All right reserved</footer>
		</div>
	);
}

export default App;
