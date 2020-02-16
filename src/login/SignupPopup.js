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
	email:string,
|};


// Signup Popup component.
class SignupPopup extends React.Component<Props, State> {

	constructor(){
		super();
		this.state={
			response: '',
			userName: '',
			email: '',
			password: '',
			responseToPost: ''
		}
	}

	handleSignUpClick = async ():Promise<void> => {
		const response = await fetch('/api/user/registerUser', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ userName: this.state.userName, email: this.state.email, password:this.state.password }),
		});
		const body = await response.text();
		console.log(body);
	};

	render(): React.Node {
		return (
			<Popup trigger={<button type="button" className="clearbtn">Signup</button>} modal>
				{close => (
					<div className="popup">
						<h1>Signup</h1>
						<form data-toggle="validator" method="post" action="#">
							<div className="row col-md-12 form-group">
								<label>Email</label>
								<div className="input-group">
									<input type="text" className="inputText" name="signUpEmail" value={this.state.email} onChange={e => this.setState({ email: e.target.value})}/>
								</div>
							</div>
							<div className="row col-md-12 form-group">
								<label>Username</label>
								<div className="input-group">
									<input type="text" className="inputText" name="signUpUserName" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value})} />
								</div>
							</div>
							<div className="row col-md-12 form-group">
								<label>Password</label>
								<div className="input-group">
									<input type="password" name="signUpPassword" className="inputText" value={this.state.password} onChange={e => this.setState({ password: e.target.value})}/>
								</div>
							</div>
							<div className="row col-md-12 form-group">
								<label>Confirm Password</label>
								<div className="input-group">
									<input type="password" name="signUpPassword" className="inputText"/>
								</div>
								<div className="help-block with-errors text-danger"></div>
							</div>
							<div className="row col-md-12">
								<Link to="/MainMenu">
									<button type="submit" className="popupbtn" onClick={this.handleSignUpClick}>Signup</button>
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

export default SignupPopup;
