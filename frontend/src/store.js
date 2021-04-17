import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListReducer,
	orderMineListReducer,
	orderPayReducer,
} from './reducers/orderReducers';
import {
	productCreateReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productUpdateReducer,
} from './reducers/productsReducers';
import {
	userDetailsReducer,
	userRegisterReducer,
	userSigninReducer,
	userUpdateProfileReducer,
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
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	orderList: orderListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
