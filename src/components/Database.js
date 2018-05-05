import firebase from './firebase.js';
import React from 'react';

class Database extends React.Component {
	state = {
		someData: {}
	};

	componentDidMount() {
		// Updating the `someData` local state attribute when the Firebase Realtime Database data
		// under the '/someData' path changes.
		this.firebaseRef = firebase.database().ref('/messages');
		this.firebaseCallback = this.firebaseRef.on('value', (snap) => {
			this.setState({ someData: snap.val() });
		});
	}

	componentWillUnmount() {
		// Un-register the listener on '/someData'.
		this.firebaseRef.off('value', this.firebaseCallback);
	}

	render() {
		console.log('result', this.state.someData);
		return (<div>database</div>);
	}
}
export default Database;