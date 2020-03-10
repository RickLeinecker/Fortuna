//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';
// Login component.

type Props = {||}; 

type State = {|
	response: string,
	userName: string,
	password: string,
	responseToPost: string,
	loggedIn: boolean,
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
			loggedIn: false
		}
	}

	handleLoginClick = async ():Promise<void> => {

		const response = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ userName: this.state.userName, password: this.state.password }),
		});

		const body = await response.text();
		const cookies = new Cookies();
		cookies.set('token', body, { path: '/' });
		this.setState({loggedIn: true});
	};

	render(): React.Node {
		const loginButton = (
			<Link to="MainMenu">
				<button 
					type="submit" 
					className="popupbtn" 
					onClick={this.handleLoginClick}
				>
					Login
				</button>
			</Link>
		);
		
		return (
			<Popup 
				trigger={
					<button type="button" className="primarybtn">
						Login
					</button>
				} modal>
				{close => (
					<div className="popup">
						<h3>Login</h3>
						<form data-toggle="validator" method="post" action="#">
							<div className="row col-md-12 form-group">
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
							<div className="row col-md-12 form-group">
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
								{loginButton}
								<button className="cancelbtn" onClick={() => { close(); }}>Cancel</button>
							</div>
						</form>
					</div>
				)}
			</Popup>
		);
	}
}

export default LoginPopup;