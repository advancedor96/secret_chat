import { observable, computed, action } from "mobx"
import { apps } from "firebase";
import firebase from '../components/firebase';
import moment from 'moment';

var AppStore = observable({
	username: '',
	timer: 3,
	firebaseRef: {},
	messages: {},
	isLoading: false,
});

window.AppStore = AppStore;

AppStore.load = action(()=>{
	AppStore.isLoading = true;
	if(localStorage.username !== undefined){
		AppStore.username = localStorage.username;
		console.log('取得username:',AppStore.username);
	}

	AppStore.firebaseRef = firebase.database().ref('/messages');
	AppStore.firebaseCallback = AppStore.firebaseRef.on('value', (snap) => {
		AppStore.isLoading = false;
		AppStore.messages = snap.val();
	
		/* 讀到資料後，要改 view 請到 DOM 改 */
		// setTimeout(() => {
		// 	document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight - document.querySelector('.messages').clientHeight;
		// }, 300);
	});
});

AppStore.logout = action(()=>{
	localStorage.removeItem('username');
	AppStore.username = '';
})

AppStore.setUsername = action((newValue)=>{
	AppStore.username = newValue;
	localStorage.username = newValue;
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