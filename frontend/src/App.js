import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SellerRoute from './components/SellerRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SellerScreen from './screens/SellerScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const dispatch = useDispatch();
	const signoutHandler = () => {
		dispatch(signout());
	};
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<Link className="brand" to="/">
							Frocery
						</Link>
					</div>
					<div>
						<Link to="/products">Shop</Link>
						<Link to="/cart">
							Cart
							{cartItems.length > 0 && (
								<span className="badge">{cartItems.length}</span>
							)}
						</Link>

						{userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<Link to="#admin">
									Admin <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/productlist">Products</Link>
									</li>
									<li>
										<Link to="/orderlist">Orders</Link>
									</li>
									<li>
										<Link to="/userlist">Users</Link>
									</li>
								</ul>
							</div>
						)}
						{userInfo && userInfo.isSeller && (
							<div className="dropdown">
								<Link to="#admin">
									Seller <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/productlist/seller">Products</Link>
									</li>
									<li>
										<Link to="/orderlist/seller">Orders</Link>
									</li>
								</ul>
							</div>
						)}
						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name} <i className="fa fa-caret-down"></i>{' '}
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/profile">User Profile</Link>
									</li>
									<li>
										<Link to="/orderhistory">Order History</Link>
									</li>
									<li>
										<Link to="#signout" onClick={signoutHandler}>
											Sign Out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
					</div>
				</header>
				<main>
					<Route
						path="/product/:id/edit"
						component={ProductEditScreen}
						exact
					></Route>
					<AdminRoute
						path="/productlist"
						component={ProductListScreen}
						exact
					></AdminRoute>
					<AdminRoute
						path="/orderlist"
						component={OrderListScreen}
						exact
					></AdminRoute>
					<PrivateRoute
						path="/profile"
						component={ProfileScreen}
					></PrivateRoute>
					<AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
					<AdminRoute
						path="/user/:id/edit"
						component={UserEditScreen}
					></AdminRoute>
					<SellerRoute
						path="/productlist/seller"
						component={ProductListScreen}
					></SellerRoute>
					<SellerRoute
						path="/orderlist/seller"
						component={OrderListScreen}
					></SellerRoute>
					<Route path="/seller/:id" component={SellerScreen}></Route>
					<Route path="/orderhistory" component={OrderHistoryScreen}></Route>
					<Route path="/order/:id" component={OrderScreen}></Route>
					<Route path="/placeorder" component={PlaceOrderScreen}></Route>
					<Route path="/payment" component={PaymentScreen}></Route>
					<Route path="/shipping" component={ShippingAddressScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/product/:id" component={ProductScreen} exact></Route>
					<Route path="/products" component={ProductsScreen}></Route>
					<Route path="/" component={HomeScreen} exact></Route>
				</main>
				<div class="footer">
    				<div class="footer-content">
						<div class="footer-section about">
        					<h2>Frocery</h2>
        					<p class="text-justify">As we staying at home, a lot of us prefer to or need to order groceries online. Maybe you’re immunocompromised and don’t want to risk leaving the house? beacuse of the pandemic
							Whatever your reason, Frocery act as online service that can help you — yes, even during these trying times.
       						</p>
        					<div class="contact">
          						<span><i class="fas fa-phone"></i> &nbsp; (02) 005 1221</span>
          							<span><i class="fas fa-envelope"></i> &nbsp; frocery@gmail.com</span>
       						 </div>
        					<div class="socials">
								<a href="/#"><i class="fab fa-facebook"></i></a>
								<a href="/#"><i class="fab fa-instagram"></i></a>
								<a href="/#"><i class="fab fa-twitter"></i></a>
								<a href="/#"><i class="fab fa-youtube"></i></a>
							</div>
						</div>
      					<div class="footer-section links"><div class="footerrun">
							<h2>Help</h2>
							<br />
							<ul>
								<a href="/#">
									<li>Guide</li>
								</a>
								<a href="/#">
									<li>Partnered Stores</li>
								</a>
								<a href="/#">
									<li>Frequently Asked Questions</li>
								</a>
								<a href="/#">
									<li>Privacy Policy</li>
								</a>
								<a href="/#">
									<li>Terms and Conditions</li>
								</a>
								</ul>
							</div>
						</div>
						<div class="footer-section contact-form">
							<h2 class='contact-us'>Contact us</h2>
							<br />
							<form action="index.html" method="post">
								<input type="email" name="email" class="text-input contact-input" placeholder="Your email address..."></input>
								<textarea rows="4" name="message" class="text-input contact-input" placeholder="Your message..."></textarea>
								<button type="submit" class="btn btn-big contact-btn">
									<i class="fas fa-envelope"></i>
										Send
								</button>
    						 </form>
						</div>						
					</div>
   				 </div>
			</div>
		</BrowserRouter>
	);
}

export default App;
