import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import Product from '../components/Product.js';

export default function ProductsScreen() {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts({}));
		console.log(listProducts({}));
	}, [dispatch]);
	return (
		<div>
			<div id="slider">
				<figure>
					<img src="ui_img/banner3.jpg" alt="banner"></img>
					<img src="ui_img/banner1.jpg" alt="banner"></img>
					<img src="ui_img/banner2.jpg" alt="banner"></img>
					<img src="ui_img/banner3.jpg" alt="banner"></img>
					<img src="ui_img/banner2.jpg" alt="banner"></img>
				</figure>
			</div>
				<h2 class="title">Featured Products</h2>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
					<div class="row center">
						<div class="arrival__center">
							{products.map((product) => (
								<div class="product">
									<div class="img__container">
										<div class="card">
											<div key={product._id}>
											<Product key={product._id} product={product}></Product>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
} 