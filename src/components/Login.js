import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import moment from 'moment';
import './App.css';
// import Database from './Database';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Space from '../images/space.png';
import swal from 'sweetalert';

class Login extends Component {
	constructor(props) {
		super(props);
	}

	handleClickSend = ()=>{
		if(this.id_input.input.value.length !== 0){
			AppStore.setUsername(this.id_input.input.value);
		}else{
			swal('不給進入', '請輸入名字', 'error');
		}
	}
	handleEnter = (e)=>{
		if(e.keyCode === 13){
			this.handleClickSend();
		}
	}
	render() {
		return (
			<div className="login_container" style={{backgroundImage: `url(${Space})` }}>
				<TextField
					autoFocus={true}
					hintText="輸入暱稱"
					hintStyle={{color: 'white', fontSize: '20px'}}
					inputStyle={{color: 'white', fontSize: '20px'}}
					ref={(a)=>{this.id_input = a;}}
					onKeyUp={this.handleEnter}
					className="login_textField"
					underlineFocusStyle={{borderBottom: ' 2px solid #77EF71 '}}
				/>
				<br />
				<button className="loginBtn" onClick={this.handleClickSend}>進入</button>
			</div>
		);
	}
}

export default observer(Login);
