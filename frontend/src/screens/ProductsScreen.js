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
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="row center">
					{products.map((product) => (
						<Product key={product._id} product={product}></Product>
					))}
				</div>
			)}
		</div>
	);
}
