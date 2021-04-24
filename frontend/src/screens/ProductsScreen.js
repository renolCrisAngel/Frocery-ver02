import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

export default function ProductsScreen() {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts({}));
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
						<div key={product._id} className="card">
							<Link to={`/product/${product._id}`}>
								<img
									className="medium"
									src={product.image}
									alt={product.name}
								/>
							</Link>
							<div className="card-body">
								<Link to={`/product/${product._id}`}>
									<h2>{product.name}</h2>
								</Link>
								<Rating
									rating={product.rating}
									numReviews={product.numReviews}
								></Rating>
								<div className="price">&#8369; {product.price}</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
