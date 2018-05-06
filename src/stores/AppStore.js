import { observable, computed, action } from "mobx"
import { apps } from "firebase";
import firebase from '../components/firebase';
import moment from 'moment';

var AppStore = observable({
	username: '',
	timer: 3,
	firebaseRef: {},
	messages: {},
});

window.AppStore = AppStore;

AppStore.load = action(()=>{
	if(localStorage.username !== undefined){
		AppStore.username = localStorage.username;
		console.log('取得username:',AppStore.username);
	}

	AppStore.firebaseRef = firebase.database().ref('/messages');
	AppStore.firebaseCallback = AppStore.firebaseRef.on('value', (snap) => {
		AppStore.messages = snap.val();
		console.log('store 發現變化：',AppStore.messages);
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