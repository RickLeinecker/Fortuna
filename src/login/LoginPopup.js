//@flow strict
import * as React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';


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
// END OF NOTE


// Login Popup component.
class LoginPopup extends React.Component<Props, State> {

	constructor(){
		super();
		this.state={
			response: '',
			userName: '',
			password: '',
			responseToPost: ''
		}
	}

	/*componentDidMount():void {
		this.callApi()
		.then(res => this.setState({ response: res.express }))
		.catch(err => console.log(err));
	};
	
	callApi = async ():Promise<SignupResponse> => {
		const response:Response = await fetch('user/login');
		const body:SignupResponse  = await response.json();
		if (response.status !== 200) throw Error(body.message);
		
		return body;
	};*/

	handleLoginClick = async ():Promise<void> => {
		const response = await fetch('user/login', {
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
			<Popup trigger={<button type="button" className="btn">Login</button>} modal>
				{close => (
					<div className="popup">
						<h1>Login</h1>
						<form data-toggle="validator" role="form" method="post" action="#">
							<div className="row col-md-12 form-group">
								<label>Username</label>
								<div className="input-group">
									<input type="text" className="inputText" name="loginUserName" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value})} />
								</div>
							</div>
							<div className="row col-md-12 form-group">
								<label>Password</label>
								<div className="input-group">
									<input type="password" name="loginPassword" className="inputText" value={this.state.password} onChange={e => this.setState({ password: e.target.value})} />
								</div>
								<div className="help-block with-errors text-danger"></div>
							</div>
							<div className="row col-md-12">
								<Link to="/MainMenu">
									<button type="submit" className="popupbtn" onClick={this.handleLoginClick}>Login</button>
								</Link>
								<button className="closebtn" onClick={() => { close(); }}>Cancel</button>
							</div>
						</form>
					</div>
				)}
			</Popup>
		);
	}
}

export default LoginPopup;
