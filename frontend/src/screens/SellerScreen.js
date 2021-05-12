import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
	const sellerId = props.match.params.id;
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const productList = useSelector((state) => state.productList);
	const {
		loading: loadingProducts,
		error: errorProducts,
		products,
	} = productList;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(detailsUser(sellerId));
		dispatch(listProducts({ seller: sellerId }));
	}, [dispatch, sellerId]);
	return (
		<div>		
		{loading ? (
			<LoadingBox></LoadingBox>
		) : error ? (	
			<MessageBox variant="danger">{error}</MessageBox>
		) : (
			<div class="card card-body">
				<div class="cart__like">
					<div class="logo__holder">
						<img view src={user.seller.logo} alt={user.seller.name} />
			 		 </div>
			  	<div class="cart__details">
					<h2 class = "product-title">{user.seller.name}</h2> 	
						<Rating
						rating={user.seller.rating}
						numReviews={user.seller.numReviews}
					></Rating>
						<a href={`mail to:${user.email}`}>Contact Seller</a>
					<div>
						<h2>About Shop</h2>
							{user.seller.description}
					</div> 
				</div>
			</div>
			<h2 class="title">All Products</h2>
			<div class="row center">
				{loadingProducts ? (
				<LoadingBox></LoadingBox>
				) : errorProducts ? (
					<MessageBox variant="danger">{errorProducts}</MessageBox>
				) : (
						<>
							{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
								<div class="row center">
									<div class="arrival__center"></div>
										<div className="row center">
											{products.map((product) => (
											<div class="product">
												<div class="img__container">
													<div class="card">
													<Product key={product._id} product={product}></Product>
												</div>
											</div>
										</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
