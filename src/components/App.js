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
import Gear from '../images/Gear.svg';
import Logout from '../images/logout.png';
import Space from '../images/space.png';
import SendBtn from '../images/send.png';

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
		if (this.TextField.value.length !== 0) {
			AppStore.send(this.TextField.value);
			this.TextField.value = '';
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
			<React.Fragment>
				<AppBar
					className="AppBar"
					title="秘密聊天室"
					iconElementLeft={<img src={Logout} alt="登出" onClick={this.handleLogout}/>}
				/>
				<div className="messages" style={{backgroundImage: `url(${Space})` }}>
					{
						AppStore.isLoading?
						(
							<div className="center_container">
								<img src={Gear} alt="loading" />
							</div>
						):

						_.map(AppStore.messages, (o, key) => {
							let item_class = '', author = '';
							if(o.author === AppStore.username){
								item_class = 'my_speak';
								author = '';
							}else{
								item_class = 'other_speak';
								author = o.author;

							}
							return (
							<div className={item_class} key={key}>
								<div className="author">{author}</div>
								<span className="msg">{o.message}</span>
								{/* <span className="time">{moment(o.timestamp).format("MM/DD HH:mm")}</span> */}
							</div>							

						)
						})
					}
				</div>

				<div className="row bottom_row">
					<input type='text'
						placeholder="輸入訊息"
						ref={(a) => { this.TextField = a; }}
						onKeyUp={this.handleEnter}
					/>
					{/* <TextField
						hintText="輸入訊息"
						ref={(a) => { this.TextField = a; }}
						onKeyUp={this.handleEnter}
					/> */}
					<button onClick={this.handleClickSend}>
						<img src={SendBtn} alt='送出' />
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default observer(App);
