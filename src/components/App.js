import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import logo from './logo.svg';
import AppStore from '../stores/AppStore';
import moment from 'moment';
import './App.css';
// import Database from './Database';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class App extends Component {
	constructor(props) {
		super(props);
		AppStore.load();
	}
	handleClickSend = ()=>{
		if(this.TextField.input.value.length !== 0){
			AppStore.send(this.TextField.input.value);
			this.TextField.input.value = '';
		}

	}
	handleEnter = (e)=>{
		if(e.keyCode === 13){
			this.handleClickSend();
		}
	}
	render() {
		return (
			<div>
				<TextField
					hintText="輸入訊息"
					ref={(a)=>{this.TextField = a;}}
					onKeyUp={this.handleEnter}
				/>
				<RaisedButton label="送出" onClick={this.handleClickSend}/>
				<ul>
				{
					_.map(AppStore.messages, (o, key)=>{
						return <li key={key}>{o.author}：{o.message} <span>{moment(o.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span></li>
					})
				}
				</ul>
			</div>
		);
	}
}

export default observer(App);
