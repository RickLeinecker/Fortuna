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
					<h4 className="col-md-4">LeaderBoard</h4>
					<h1 className="col-md-4 text-center">Fortuna</h1>
					<h4 className="col-md-4 text-right">What is Fortuna?</h4>
				</div>
				<div className="row styleForRow">
					<div className="container h-100">
						<div className="row h-100 justify-content-center align-items-center">
							<div className="card">
								<h4 className="card-header">Login</h4>
								<div className="card-body">
									<form data-toggle="validator" role="form" method="post" action="#">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label>UserName</label>
													<div className="input-group">
														<input type="text" className="form-control" name="loginUserName" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} />
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label>Password</label>
													<div className="input-group">
														<input type="password" name="loginPassword" className="form-control"/>
													</div>
													<div className="help-block with-errors text-danger"></div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<Link to="/MainMenu">
													<button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleLoginClick}>Login</button>
												</Link>
											</div>
										</div>
									</form>
									<div className="row styleForRow">
										<div className="col text-center">
											<button type="button" className="btn btn-secondary btn-sm">Signup</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
