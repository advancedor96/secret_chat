import { observable, computed, action } from "mobx"
import { apps } from "firebase";
import firebase from '../components/firebase';
import moment from 'moment';

var AppStore = observable({
	timer: 3,
	firebaseRef: {},
	messages: {},
});
window.AppStore = AppStore;
AppStore.load = action(()=>{
	AppStore.firebaseRef = firebase.database().ref('/messages');
	AppStore.firebaseCallback = AppStore.firebaseRef.on('value', (snap) => {
		AppStore.messages = snap.val();
		console.log('store 發現變化：',AppStore.messages);
	});
});


AppStore.send = (msg)=>{
	console.log('store 準備送資料到 server',);
	AppStore.firebaseRef.push({
		author:'ding',
		message:msg,
		timestamp: moment().toString()
	})
};

AppStore.add = action(()=>{
	AppStore.timer++;
});


AppStore.resetTimer = action(function reset() {
	AppStore.timer = 0;
});

export default AppStore;