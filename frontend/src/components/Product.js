import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
	const { product } = props;
	return (
		<div class ='img-view'>
		  <div key={product._id} className="col-1">
			<Link to={`/product/${product._id}`}>
				<img src={product.image} alt={product.name} />
			</Link>
			<div className="card-body">
				<Link to={`/product/${product._id}`}>
					<h2>{product.name}</h2>
				</Link>
					&#8369;{product.price}
				<Rating
					rating={product.rating}
					numReviews={product.numReviews}
				></Rating>
				
				<div className="row">
					<div>
						<Link to={`/seller/${product.seller._id}`}>
							{product.seller.name}
						</Link>
					</div>
				</div>
			</div>
		</div>
		</div>
			
	);
}
