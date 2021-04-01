import React from 'react';
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
							<div key={product.id} className="card">
								<a href={`/product/${product.id}`}>
									<img
										className="medium"
										src={product.image}
										alt={product.name}
									/>
								</a>
								<div className="card-body">
									<a href={`/product/${product.id}`}>
										<h2>{product.name}</h2>
									</a>
									<div className="rating">
										<span>
											<i className="fa fa-star"></i>
										</span>
										<span>
											<i className="fa fa-star"></i>
										</span>
										<span>
											<i className="fa fa-star"></i>
										</span>
										<span>
											<i className="fa fa-star"></i>
										</span>
										<span>
											<i className="fa fa-star"></i>
										</span>
									</div>
									<div className="price">&#8369; {product.price}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<footer className="row center">All right reserved</footer>
		</div>
	);
}

export default App;
