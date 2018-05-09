import { observable, computed, action } from "mobx"
import { apps } from "firebase";
import firebase from '../components/firebase';
import moment from 'moment';

var AppStore = observable({
	username: '',
	timer: 3,
	firebaseRef: {},
	firebaseRefGetLast: {},
	messages: {},
	isLoading: false,
	isScrollingDown: false,
});

window.AppStore = AppStore;

AppStore.load = action(()=>{
	AppStore.isLoading = true;


	AppStore.firebaseRefGetLast = firebase.database().ref('/messages').limitToLast(50);;
	AppStore.firebaseCallback = AppStore.firebaseRefGetLast.on('value', (snap) => {
		// console.log('讀到:',snap.val());
		AppStore.isLoading = false;
		AppStore.messages = snap.val();
		AppStore.isScrollingDown = true;
		// AppStore.messages[snap.key] = snap.val();
	
		/* 讀到資料後，要改 view 請到 DOM 改 */
			setTimeout(() => {
				document.querySelector('.messages_container').scrollTop = document.querySelector('.messages_container').scrollHeight - document.querySelector('.messages_container').clientHeight;
				
			}, 200);
	});

	AppStore.firebaseRef = firebase.database().ref('/messages');
});

AppStore.setIsScrollingDown = action((new_value)=>{
	AppStore.isScrollingDown = new_value;
})

AppStore.logout = action(()=>{
	localStorage.removeItem('username');
	AppStore.username = '';
})

AppStore.setUsername = action((newValue)=>{
	AppStore.username = newValue;
	localStorage.username = newValue;


	AppStore.load();
})

AppStore.send = (msg)=>{
	console.log('store 準備送資料到 server',);
	AppStore.firebaseRef.push({
		author: AppStore.username,
		message:msg,
		timestamp: moment().toISOString()
	})
};

AppStore.add = action(()=>{
	AppStore.timer++;
});


AppStore.resetTimer = action(function reset() {
	AppStore.timer = 0;
});

export default AppStore;