import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../node_modules/axios/index';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [sellerName, setSellerName] = useState('');
	const [sellerLogo, setSellerLogo] = useState('');
	const [sellerDescription, setSellerDescription] = useState('');

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [errorUpload, setErrorUpload] = useState('');

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
			setSellerLogo(data);
			setLoadingUpload(false);
		} catch (error) {
			setErrorUpload(error.message);
			setLoadingUpload(false);
		}
	};

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		success: successUpdate,
		error: errorUpdate,
		loading: loadingUpdate,
	} = userUpdateProfile;

	const dispatch = useDispatch();
	useEffect(() => {
		if (!user) {
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
			dispatch(detailsUser(userInfo._id));
		} else {
			setName(user.name);
			setEmail(user.email);
			if (user.seller) {
				setSellerName(user.seller.name);
				setSellerLogo(user.seller.logo);
				setSellerDescription(user.seller.description);
			}
		}
	}, [dispatch, userInfo._id, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		// dispatch update profile
		if (password !== confirmPassword) {
			alert('Password and Confirm Password Are Not Matched');
		} else {
			dispatch(
				updateUserProfile({
					userId: user._id,
					name,
					email,
					password,
					sellerName,
					sellerLogo,
					sellerDescription,
				})
			);
		}
	};
	return (
		<div>
			{/* <div class="forms-container"> */}
				{/* <div class="prof-screen"> */}
          			<form action="#" class="sign-in-form" onSubmit={submitHandler}>
       					<h2 class="title">User Profile</h2>
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
								<div>
									{loadingUpdate && <LoadingBox></LoadingBox>}
									{errorUpdate && (
										<MessageBox variant="danger">{errorUpdate}</MessageBox>
									)}
									{successUpdate && (
										<MessageBox variant="success">
											Profile Updated Successfully
										</MessageBox>
									)}
								</div>
								<div class="input-field" >
           							<i class="fas fa-user"></i>
									<input
										id="name"
										type="text"
										placeholder="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									></input>
								</div>
								<div class="input-field">
       								<i class="fas fa-envelope"></i>
									<input
										id="email"
										type="email"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									></input>
								</div>
								<div class="input-field">
          							<i class="fas fa-lock"></i>
									<input
										id="password"
										type="password"
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
									></input>
								</div>
								<div class="input-field">
          							<i class="fas fa-lock"></i>
									<input
										id="confirmPassword"
										type="password"
										placeholder="Confirm Password"
										onChange={(e) => setConfirmPassword(e.target.value)}
									></input>
								</div>
								{user.isSeller && (
									<>
									<h2 class="title">Seller</h2>
										<div class="input-field" >
           									<i class="fas fa-user"></i>
											<input
												id="sellerName"
												type="text"
												placeholder="Store Name"
												value={sellerName}
												onChange={(e) => setSellerName(e.target.value)}
											></input>
										</div>
										{/* <div class="input-field" >
           									<i class="fas fa-box"></i>
											<input
												id="sellerLogo"
												type="text"
												placeholder="Insert Seller Logo"
												value={sellerLogo}
												onChange={(e) => setSellerLogo(e.target.value)}
											></input>
										</div> */}
										
										<div class="input-field" >
           									<i class="fas fa-image"></i>
											<input
												type="file"
												id="sellerLogo"
												label="Choose Logo"
												onChange={uploadFileHandler}
											></input>
											{loadingUpload && <LoadingBox></LoadingBox>}
											{errorUpload && (
												<MessageBox variant="danger">{errorUpload}</MessageBox>
											)}
										</div>
										<div class="input-field" >
           									<i class="fas fa-sticky-note"></i>
											<input
												id="sellerDescription"
												type="text"
												placeholder="Description"
												value={sellerDescription}
												onChange={(e) => setSellerDescription(e.target.value)}
											></input>
										</div>
									</>
								)}
								<div>
									<input class="btn solid" type="submit" value="Update" />	
								</div>
							</>
						)}
					</form>
				</div>
			// </div>
		// </div>
	);
}