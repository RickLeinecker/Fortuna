//@flow strict

import * as React from 'react';
import './Login.css';
import Popup from 'reactjs-popup';
import setLoginToken from '../globalComponents/setLoginToken.js';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {||};

type State = {|
	userName: string,
	password: string,
	email: string,
	loggedIn: boolean,
	loginDialogOpen: boolean,
	resetPasswordOpen: boolean
|};

// Login Popup component. Display Login Form.
class LoginPopup extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			userName: '',
			password: '',
			email: '',
			loggedIn: false,
			loginDialogOpen: false,
			resetPasswordOpen: false
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
					console.log(data);
					toast.error(getErrorFromObject(data));
				}
				else {
					setLoginToken(data.token);
					window.location=verifyLink('/MainMenu');
				}
			})
		).catch(
			(error) => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	handleSendResetPwdEmailClick(): void {

		const responsePromise: Promise<Response> = fetch('/api/user/passwordResetReq', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ email: this.state.email })
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data);
					toast.error(getErrorFromObject(data));
				}
				else {
					toast.success("Your password reset email has been sent!");
					this.setState({ resetPasswordOpen: false, loginDialogOpen: false });
				}
			})
		).catch(
			(error) => {
				toast.error("Couldn't connect to server!");
				console.log(error);
			}
		);
	}

	handleCancelClick(): void {
		this.setState({loginDialogOpen: false});
	}

	handleCancelResetPassword(): void {
		this.setState({resetPasswordOpen: false});
	}

	onEmailRegistered(registeredUsername: string, registeredPassword: string, isGoogle = true) {

    let dialog = isGoogle ? false : true;

		this.setState({
			userName: registeredUsername,
			password: registeredPassword,
			loginDialogOpen: dialog
		});
		
    (registeredPassword == " ") ? 
      toast.success('Welcome to Fortuna!') 
      : toast.success('Please click the link we sent to your email to verify your account.');
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
		const sendPwdResetButton = (
			<button className="popupbtn" onClick={() => this.handleSendResetPwdEmailClick()}>
				Submit
			</button>
		);
		const cancelPwdResetButton = (
			<button className="cancelbtn" onClick={() => this.handleCancelResetPassword()}>
				Cancel
			</button>
		);

		return (
			<div>
				<button type="button" className="loginbtn" onClick={() => this.setState({loginDialogOpen: true})}>
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
						<div className="row col-md-12">
							<button
								type="button"
								style={{ paddingLeft: 0, marginTop: 20 }}
								className="clearbtn"
								onClick={() => this.setState({ resetPasswordOpen: true })}
							>
								Forgot Password?
							</button>
						</div>
						<br/>
						<div className="row col-md-12">
							{loginButton}
							{cancelButton}
						</div>
					</div>
				</Popup>
				<Popup
					open={this.state.resetPasswordOpen}
					onClose={() => this.handleCancelResetPassword()}
				>
					<div className="popup">
						<h3>Password Reset Request</h3>
						<div className="row col-md-12">
							<label>Enter Your Account Email</label>
							<div className="input-group">
								<input
									type="text"
									className="inputText"
									onChange={e => this.setState({ email: e.target.value })}
								/>
							</div>
						</div>
						<div className="row col-md-12">
							{sendPwdResetButton}
							{cancelPwdResetButton}
						</div>
					</div>
				</Popup>
				<ToastContainer />
			</div>
		);
	}
}

export default LoginPopup;
