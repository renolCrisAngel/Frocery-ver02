import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
	const userId = props.match.params.id;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isSeller, setIsSeller] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	const dispatch = useDispatch();
	useEffect(() => {
		if (!user) {
			dispatch({ type: USER_UPDATE_RESET });
			dispatch(detailsUser(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsSeller(user.isSeller);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, userId, successUpdate, props.history]);

	const submitHandler = (e) => {
		e.preventDefault();
		// dispatch update user
		dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
	};
	return (
		<div class="container">
			<div class="forms-container">
				<div>
          			<form action="#" class="sign-in-form" onSubmit={submitHandler}>
						<div>
							<h2 class="title">Edit User {name}</h2>
							<div>{loadingUpdate && <LoadingBox></LoadingBox>}</div>
							{errorUpdate && (
								<MessageBox variant="danger">{errorUpdate}</MessageBox>
							)}
							{successUpdate && (
								<MessageBox variant="success">
									User Updated Successfully
								</MessageBox>
							)}
						</div>
						{loading ? (
							<div>
								<LoadingBox />
							</div>
						) : error ? (
							<MessageBox variant="danger">{error}</MessageBox>
						) : (
							<>
								<div class="input-field">
       								<i class="fas fa-user"></i>
									<input
										id="name"
										type="text"
										placeholder="Enter name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									></input>
								</div>
								<div class="input-field">
       								<i class="fas fa-envelope"></i>
									<input
										id="email"
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									></input>
								</div>
								<div class='checkbox'>
									<label htmlFor="isSeller">Seller</label>
									<input
										id="isSeller"
										type="checkbox"
										checked={isSeller}
										value={isSeller}
										onChange={(e) => setIsSeller(e.target.checked)}
									></input>
								</div>
								<div class='checkbox'>
									<label htmlFor="isAdmin">Admin</label>
									<input
										id="isAdmin"
										type="checkbox"
										checked={isAdmin}
										onChange={(e) => setIsAdmin(e.target.checked)}
									></input>
								</div>
								<div>
									<input class="btn solid" type="submit" value="Update" />	
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
