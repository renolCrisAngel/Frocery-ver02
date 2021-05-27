import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
	orderCreateReducer,
	orderDeleteReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListReducer,
	orderMineListReducer,
	orderPayReducer,
	orderSummaryReducer,
} from './reducers/orderReducers';
import {
	productCategoryListReducer,
	productCreateReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productUpdateReducer,
} from './reducers/productsReducers';
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userRegisterReducer,
	userSigninReducer,
	userTopSellerListReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
	userSignin: {
		userInfo: localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null,
	},
	cart: {
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
		shippingAddress: localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {},
		paymentMethod: 'PayPal',
	},
};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productDelete: productDeleteReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userTopSellersList: userTopSellerListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	orderList: orderListReducer,
	orderDelete: orderDeleteReducer,
	orderDeliver: orderDeliverReducer,
	productCategoryList: productCategoryListReducer,
	orderSummary: orderSummaryReducer,

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
