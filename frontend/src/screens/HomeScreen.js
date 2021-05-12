import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { listTopSellers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
export default function HomeScreen() {
	const dispatch = useDispatch();
	const userTopSellersList = useSelector((state) => state.userTopSellersList);
	const {
		loading: loadingSellers,
		error: errorSellers,
		users: sellers,
	} = userTopSellersList;
	useEffect(() => {
		dispatch(listTopSellers());
	}, [dispatch]);
	return (
		<div>
			<h2 class="title">Top Sellers</h2>
			{loadingSellers ? (
				<LoadingBox></LoadingBox>
			) : errorSellers ? (
				<MessageBox variant="danger">{errorSellers}</MessageBox>
			) : (
				<>
					<Carousel showArrows autoPlay showThumbs={false}>
						{sellers.map((seller) => (
							<div key={seller._id}>
								<Link to={`/seller/${seller._id}`}>
									<img src={seller.seller.logo} alt={seller.seller.name} />
								</Link>
							</div>
						))}
					</Carousel>
					{sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
					<div className="row center">
						{sellers.map((seller) => (
							<div key={seller._id}>
								<div className="card">
									<Link to={`/seller/${seller._id}`}>
										<img src={seller.seller.logo} alt={seller.seller.name} />
										<h2>{seller.seller.name}</h2>
									</Link>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
