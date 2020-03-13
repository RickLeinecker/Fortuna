//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
// Login component.

type Props = {||}; 

type State = {|
	response: string,
	userName: string,
	password: string,
	responseToPost: string,
	loggedIn: boolean,

	errorMessage: string,
	loginDialogOpen: boolean
|};

// Login Popup component. Display Login Form.
class LoginPopup extends React.Component<Props, State> {

	constructor() {
		super();

		this.state={
			response: '',
			userName: '',
			password: '',
			responseToPost: '',
			loggedIn: false,

			errorMessage: '',
			loginDialogOpen: false
		}
	}

	handleLoginClick(): void {
		const responsePromise: Promise<Response> = fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ userName: this.state.userName, password: this.state.password }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					this.setState({errorMessage: getErrorFromObject(data)});
				}
				else {
					console.log(data);
					new Cookies().set('token', data.token, {path: '/'});
					window.location='/MainMenu';
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	handleCancelClick(): void {
		this.setState({loginDialogOpen: false});
	}

	onEmailRegistered(registeredUsername: string, registeredPassword: string) {
		this.setState({
			userName: registeredUsername,
			password: registeredPassword,
			loginDialogOpen: true,
			errorMessage: 'Please click the link we set to your email and the log in.'
		});
	}

	render(): React.Node {
		const loginButton = (
			<button className="popupbtn" onClick={() => this.handleLoginClick()}>
				Login
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.handleCancelClick()}>Cancel</button>
		);
		
		return (
			<div>
				<button type="button" className="primarybtn" onClick={() => this.setState({loginDialogOpen: true})}>
					Login
				</button>
				<Popup 
					open={this.state.loginDialogOpen}
					onClose={() => this.handleCancelClick()}
				>
					<div className="popup">
						<h3>Login</h3>
						<div className="row col-md-12">
							<label>Username</label>
							<div className="input-group">
								<input 
									type="text" 
									className="inputText" 
									name="loginUserName" 
									value={this.state.userName} 
									onChange={e => this.setState({ userName: e.target.value})} 
								/>
							</div>
						</div>
						<div className="row col-md-12">
							<label>Password</label>
							<div className="input-group">
								<input 
									type="password" 
									name="loginPassword" 
									className="inputText" 
									value={this.state.password} 
									onChange={e => this.setState({ password: e.target.value})} 
								/>
							</div>
							<div className="help-block with-errors text-danger"></div>
						</div>
						<div className="fixedHeight">
							{this.state.errorMessage}
						</div>
						<div className="row col-md-12">
							{loginButton}
							{cancelButton}
						</div>
					</div>
				</Popup>
			</div>
		);
	}
}

export default LoginPopup;
