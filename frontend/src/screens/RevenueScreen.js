import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function RevenueScreen(props) {
	const sellerMode = props.match.path.indexOf('/seller') >= 0;

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = orderDelete;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: ORDER_DELETE_RESET });
		dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
	}, [dispatch, sellerMode, successDelete, userInfo._id]);

	const deleteHandler = (order) => {
		if (window.confirm('Are you sure to delete?')) {
			dispatch(deleteOrder(order._id));
		}
	};
	return (
		<div>
			<h2 class="title">Revenue</h2>
			<div>
				{loadingDelete && <LoadingBox></LoadingBox>}
				{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
				<table className="styled-table-wide">
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
                            <th>Sub-Revenue</th>
							<th>Paid</th>
							<th>Delivered</th>
						</tr>
					</thead>
					<tbody>
						{
                        orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>&#8369;{order.totalPrice.toFixed(2)}</td>
                                <td>&#8369;{order.taxPrice.toFixed(2)/2}</td>
								<td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
								<td>
									{order.isDelivered
										? order.deliveredAt.substring(0, 10)
										: 'No'}
								</td>
							</tr>
						))
                        }
					</tbody>
				</table>
			)}
            {/* <h1>Revenue Income: </h1> */}
		</div>
	);
}
