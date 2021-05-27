import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createProduct,
	deleteProduct,
	listProducts,
} from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_DELETE_RESET,
} from '../constants/productsConstants';

export default function ProductListScreen(props) {
	const sellerMode = props.match.path.indexOf('/seller') >= 0;
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;
	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();
	useEffect(() => {
		if (successCreate) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			props.history.push(`/product/${createdProduct._id}/edit`);
		}
		if (successDelete) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		}
		dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
	}, [
		createdProduct,
		dispatch,
		props.history,
		sellerMode,
		successCreate,
		successDelete,
		userInfo._id,
	]);

	const deleteHandler = (product) => {
		if (window.confirm('Are you sure to delete?')) {
			dispatch(deleteProduct(product._id));
		}
	};
	const createHandler = (e) => {
		e.preventDefault();
		dispatch(createProduct());
	};
	const editHandler = (product) => {
		props.history.push(`/product/${product._id}/edit`);
	};
	return (
		<div>
			<div className="row">
				<h2 class="title">Products</h2>
				{userInfo && userInfo.isSeller && (
					<button type="button" className="primary" onClick={createHandler}>
						Create Product
					</button>
				)}
			</div>
			{loadingDelete && <LoadingBox></LoadingBox>}
			{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
			{loadingCreate && <LoadingBox></LoadingBox>}
			{errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<table className="styled-table-wide">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>&#8369;{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<button
										type="button"
										className="medium"
										onClick={() => editHandler(product)}
									>
										Edit
									</button>
									<button
										type="button"
										className="medium"
										onClick={() => deleteHandler(product)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
