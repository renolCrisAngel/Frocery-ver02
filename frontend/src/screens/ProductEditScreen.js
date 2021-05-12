import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productsConstants';

export default function ProductEditScreen(props) {
	const productId = props.match.params.id;
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [brand, setBrand] = useState('');
	const [description, setDescription] = useState('');

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	const dispatch = useDispatch();
	useEffect(() => {
		if (!product || product._id !== productId) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			dispatch(detailsProduct(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setBrand(product.brand);
			setDescription(product.description);
		}
	}, [product, dispatch, productId, successUpdate, props.history]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				category,
				brand,
				countInStock,
				description,
			})
		);
	};

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [errorUpload, setErrorUpload] = useState('');

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const bodyFormData = new FormData();
		bodyFormData.append('image', file);
		setLoadingUpload(true);
		try {
			const { data } = await Axios.post('/api/uploads', bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userInfo.token}`,
				},
			});
			setImage(data);
			setLoadingUpload(false);
		} catch (error) {
			setErrorUpload(error.message);
			setLoadingUpload(false);
		}
	};

	return (
		<div class="container">
			<div class="forms-container">
				<div class="product-screen">
          			<form action="#" class="sign-in-form" onSubmit={submitHandler}>
						<h1>Edit Product: {productId}</h1>
						<div>
							{loadingUpdate && <LoadingBox></LoadingBox>}
							{errorUpdate && (
								<MessageBox variant="danger">{errorUpdate}</MessageBox>
							)}
							{successUpdate && (
								<MessageBox variant="success">
									Product Updated Successfully
								</MessageBox>
							)}
						</div>
						{loading ? (
							<div>
								<LoadingBox></LoadingBox>
							</div>
						) : error ? (
							<div>
								<MessageBox variant="danger">{error}</MessageBox>
							</div>
						) : (
							<>
								<div class="input-field">
          							<i class="fas fa-tags"></i>
									<input
										id="name"
										type="text"
										placeholder="Name"
										// value={name}
										onChange={(e) => setName(e.target.value)}
									></input>
								</div>
								<div class="input-field">
          							<i class="fas fa-money-bill"></i>
									<input
										id="price"
										type="text"
										placeholder="Price"
										// value={price}
										onChange={(e) => setPrice(e.target.value)}
									></input>
								</div>
								<div class="input-field" >
           								<i class="fas fa-image"></i>
									<input
										type="file"
										id="imageFile"
										label="Choose Image"
										onChange={uploadFileHandler}
									></input>
									{loadingUpload && <LoadingBox></LoadingBox>}
									{errorUpload && (
										<MessageBox variant="danger">{errorUpload}</MessageBox>
									)}
								</div>
								<div class="input-field" >
           								<i class="fas fa-th-list"></i>
									<input
										id="category"
										type="text"
										placeholder="Category"
										// value={category}
										onChange={(e) => setCategory(e.target.value)}
									></input>
								</div>
								<div class="input-field" >
           								<i class="fas fa-th-list"></i>
									<input
										id="brand"
										type="text"
										placeholder="Brand"
										// value={brand}
										onChange={(e) => setBrand(e.target.value)}
									></input>
								</div>
								<div class="input-field" >
           								<i class="fas fa-boxes"></i>
									<input
										id="countInStock"
										type="text"
										placeholder="Count in Stock"
										// value={countInStock}
										onChange={(e) => setCountInStock(e.target.value)}
									></input>
								</div>
								<div class="input-field" >
           								<i class="fas fa-sticky-note"></i>
									<input
										id="description"
										type="text"
										placeholder="Description"
										// value={description}
										onChange={(e) => setDescription(e.target.value)}
									></input>
								</div>
								<div>
									<input class="btn solid" type="submit" value="Confirm" />
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
