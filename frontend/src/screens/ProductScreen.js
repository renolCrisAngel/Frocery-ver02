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
				<div class="cart__like">
                		<div class="image__holder">
							<img view src={product.image} alt={product.name} />
          				</div>
							<div class="cart__details">
								<h2 class = "product-title">{product.name}</h2>
								{/* <Link to={`/seller/${product.seller._id}`}>
								{product.seller.seller.name}</Link> */}
								<Rating
									rating={product.seller.seller.rating}
									numReviews={product.seller.seller.numReviews}
								></Rating>
            					<h> &#8369;{product.price}</h>
									
									<div>	
									<b>Description:  </b>{product.description}
								  	</div>
								
										<div>
											<b>Status:  </b> 
											{product.countInStock > 0 ? (
											<span class="success">In Stock</span>
										) : (
										<span class="danger">Unavailable</span>
									)}
									
										</div>{product.countInStock > 0 && (
									<>
											<b>Quantity:  </b>  
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
								<button
									type="button"
									onClick={addToCartHandler}
									className="primary block small"
								> Add to Cart </button>
								
							</>
						)}
					</div>
				</div>	
			)}
		</div>
	);	
}
