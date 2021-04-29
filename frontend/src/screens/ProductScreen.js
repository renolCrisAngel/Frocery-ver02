import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductScreen(props) {
	const dispatch = useDispatch();
	const productId = props.match.params.id;
	const [qty, setQty] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);
	const addToCartHandler = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	};
	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div class = "card-wrapper">
					<div class = "card">
						<div class = "images-display">
            				<div class = "images-showcase">
								<img view src={product.image} alt={product.name} />
							</div>
          				</div>
						<div class = "product-content">
							<h2 class = "product-title">{product.name}</h2>
								{/* <Rating
									rating={product.seller.seller.rating}
									numReviews={product.seller.seller.numReviews}
								></Rating> */}
          					<h2>
								<Link to={`/seller/${product.seller._id}`}>
									{product.seller.seller.name}
								</Link>
							</h2>
		  				</div>
					    <div class = "product-price">
            				<p class = "row">Price <span> &#8369;{product.price}</span></p>
								<div class="row">
									<div>Status</div>
										<div>
											{product.countInStock > 0 ? (
												<span class="success">In Stock</span>
											) : (
												<span class="danger">Unavailable</span>
											)}
										</div>
									</div>
          						</div>
		  				<div class = "product-detail">
            				Description {product.description}
		  				</div>
		  				{product.countInStock > 0 && (
							<>
								<div className="row">
									<div>Qty</div>
										<div>
											<select
												value={qty}
												onChange={(e) => setQty(e.target.value)}
											>
											{[...Array(product.countInStock).keys()].map(
												(x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												)
											)}
												</select>
										</div>
								</div>
								<button
									onClick={addToCartHandler}
									className="primary block"
								>
									Add to Cart
								</button>
							</>
						)}
					</div>
				</div>
			)}
			<div class="related">
							<h2>Related Items</h2>
							<div class="rows">
								<div class="columns">
									<div class="items">
									{/* {products.map((product) => (
										<Product key={product._id} product={product}></Product>
									))} */}
									</div>
								</div>
							</div>
						</div>
					</div>
	);
}