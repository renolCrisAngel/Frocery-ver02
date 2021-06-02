import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyD8Cb_FYvPekecp7pL9-0YvK5PhbJ7YAxA',
	authDomain: 'froceryver2.firebaseapp.com',
	projectId: 'froceryver2',
	storageBucket: 'froceryver2.appspot.com',
	messagingSenderId: '818251154180',
	appId: '1:818251154180:web:e486182d4bb088892a8651',
	measurementId: 'G-Y302QYBH0E',
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export default auth;
