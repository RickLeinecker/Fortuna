//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import LoginPopup from './LoginPopup.js';
import './Login.css';
const PORT = 3000;
// Login component.
type Props = {||}; 
type State = {|
	response: string,
	userName: string,
	password: string,
	responseToPost: string,
|};
//DO NOT USE THIS AS PART OF A BIGGER OBJECT.
//ONCE SIGNUP API IS DONE PUT || AT THE END
type SignupResponse = {
	express: string,
	message: string
};
//END OF NOTE

class Login extends React.Component<Props,State> {
	constructor(){
		super();
		this.state={
			response: '',
			userName: '',
			password: '',
			responseToPost: ''
		}
	}

	componentDidMount():void {
		this.callApi()
		.then(res => this.setState({ response: res.express }))
		.catch(err => console.log(err));
	};
	
	callApi = async ():Promise<SignupResponse> => {
		const response:Response = await fetch('http://localhost:'+PORT+'/signup');
		const body:SignupResponse  = await response.json();
		if (response.status !== 200) throw Error(body.message);
		
		return body;
	};

	handleLoginClick = async ():Promise<void> => {
		const response = await fetch('http://localhost:'+PORT+'/signup', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ userName: this.state.userName, password:this.state.password }),
		});
		const body = await response.text();
		console.log(body);
	};
	
	render(): React.Node {
		return (
			<div id="Parent">
				<div className="row">
					<div className="column left">
						<h4>Leaderboard</h4>
					</div>
					<div className="column middle">
						<h1>Fortuna</h1><h6>Welcome Commander</h6>
						<button type="button" className="loginbtn">Login</button>
						<button type="button" className="signupbtn">Signup</button>
					</div>
					<div className="column right">
						<h4>What is Fortuna?</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
