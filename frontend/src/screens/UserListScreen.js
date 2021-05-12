import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = userDelete;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listUsers());
		dispatch({
			type: USER_DETAILS_RESET,
		});
	}, [dispatch, successDelete]);

	const deleteHandler = (user) => {
		dispatch(deleteUser(user._id));
	};
	return (
		<div>
			<h1 class="title">Users</h1>
			<div>{loadingDelete && <LoadingBox></LoadingBox>}</div>
			{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
			{successDelete && (
				<MessageBox variant="success">User Deleted Successfully</MessageBox>
			)}
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
							<th>Email</th>
							<th>IS Seller</th>
							<th>IS Admin</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.isSeller ? 'YES' : ' NO'}</td>
								<td>{user.isAdmin ? 'YES' : 'NO'}</td>
								<td>
									<button
										type="button"
										className="medium"
										onClick={() => props.history.push(`/user/${user._id}/edit`)}
									>
										Edit
									</button>
									<button
										type="button"
										className="medium"
										onClick={() => deleteHandler(user)}
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
