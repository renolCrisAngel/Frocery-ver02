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
		<div>
			<div className="form-container">
				<div className="wrapper">
					<form className="form" onSubmit={submitHandler}>
						<div>
							<h1>Edit User {name}</h1>
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
								<div>
									<label htmlFor="name">Name</label>
									<input
										id="name"
										type="text"
										placeholder="Enter name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									></input>
								</div>
								<div>
									<label htmlFor="email">Email</label>
									<input
										id="email"
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									></input>
								</div>
								<div>
									<label htmlFor="isSeller">Is Seller</label>
									<input
										id="isSeller"
										type="checkbox"
										checked={isSeller}
										value={isSeller}
										onChange={(e) => setIsSeller(e.target.checked)}
									></input>
								</div>
								<div>
									<label htmlFor="isAdmin">Is Admin</label>
									<input
										id="isAdmin"
										type="checkbox"
										checked={isAdmin}
										onChange={(e) => setIsAdmin(e.target.checked)}
									></input>
								</div>
								<div>
									<button type="submit" className="primary">
										Update
									</button>
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
