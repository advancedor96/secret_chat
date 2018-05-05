// Import the Firebase modules that you need in your app.
import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/database';
// import 'firebase/datastore';

// Initalize and export Firebase.
const config = {
	apiKey: "AIzaSyAxxAKqgQZH2PDQfm4V-mqGkL1xxMqiU38",
	authDomain: "secretchatlove.firebaseapp.com",
	databaseURL: "https://secretchatlove.firebaseio.com",
	projectId: "secretchatlove",
	storageBucket: "secretchatlove.appspot.com",
	messagingSenderId: "804094648745"
};
export default firebase.initializeApp(config);