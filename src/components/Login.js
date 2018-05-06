import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import moment from 'moment';
import './App.css';
// import Database from './Database';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
	constructor(props) {
		super(props);
	}

	handleClickSend = ()=>{
		if(this.id_input.input.value.length !== 0){
			AppStore.setUsername(this.id_input.input.value);
		}
	}
	handleEnter = (e)=>{
		if(e.keyCode === 13){
			this.handleClickSend();
		}
	}
	render() {
		return (
			<div className="login_container">
				<TextField
					hintText="輸入您的ID"
					ref={(a)=>{this.id_input = a;}}
					onKeyUp={this.handleEnter}
					className="login_textField"
				/>
				<br />
				<RaisedButton label="確定" onClick={this.handleClickSend}/>
			</div>
		);
	}
}

export default observer(Login);
