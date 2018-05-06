import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import moment from 'moment';
import './App.css';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import swal from 'sweetalert';
import AppBar from 'material-ui/AppBar';

class App extends Component {
	constructor(props) {
		super(props);
		AppStore.load();

		if (typeof (Storage) !== "undefined") {
		} else {
			swal("此瀏覽器不支援Web Storage，無法記錄您的帳號");
		}


	}
	handleClickSend = () => {
		if (this.TextField.input.value.length !== 0) {
			AppStore.send(this.TextField.input.value);
			this.TextField.input.value = '';
		}

	}
	handleEnter = (e) => {
		if (e.keyCode === 13) {
			this.handleClickSend();
		}
	}
	handleLogout = () => {
		AppStore.logout();
	}
	render() {
		if (AppStore.username === '') {
			return <Login />
		}
		return (
			<div>
				<AppBar
					title="秘密聊天室"
					iconElementRight={<RaisedButton label="登出" onClick={this.handleLogout}/>}
				/>
				<div className="messages">
					{
						_.map(AppStore.messages, (o, key) => {
							let item_class = '', author = '';
							if(o.author === AppStore.username){
								item_class = 'my_item';
								author = '我';
							}else{
								item_class = 'item';
								author = o.author;

							}
							return (
							<div className={item_class} key={key}>
								<span className="author">{author}</span>：
								<span className="msg">{o.message}</span>
								<span className="time">{moment(o.timestamp).format("MM/DD HH:mm")}</span>
							</div>							

						)
						})
					}
				</div>

				<div className="row">
					<TextField
						hintText="輸入訊息"
						ref={(a) => { this.TextField = a; }}
						onKeyUp={this.handleEnter}
						className="msgInput"
					/>
					<RaisedButton label="送出" onClick={this.handleClickSend} />
				</div>
			</div>
		);
	}
}

export default observer(App);
