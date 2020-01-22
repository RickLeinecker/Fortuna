//@flow strict
import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main.css';
import Popup from 'reactjs-popup';


// Login component.
const PORT = 3000;
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


// Signup Popup component.
class SignupPopup extends React.Component<Props, State> {

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
			<Popup trigger={<button type="button" className="clearbtn">Signup</button>} modal>
				<div className="popup">
					<h1>Signup</h1>
					<form data-toggle="validator" method="post" action="#">
                        <div className="row col-md-12 form-group">
							<label>Email</label>
							<div className="input-group">
								<input type="text" className="form-control"/>
							</div>
						</div>
                        <div className="row col-md-12 form-group">
							<label>Username</label>
							<div className="input-group">
								<input type="text" className="form-control" name="loginUserName" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value})} />
							</div>
						</div>
						<div className="row col-md-12 form-group">
							<label>Password</label>
							<div className="input-group">
								<input type="password" name="loginPassword" className="form-control"/>
							</div>
						</div>
						<div className="row col-md-12 form-group">
                            <label>Confirm Password</label>
							<div className="input-group">
								<input type="password" name="loginPassword" className="form-control"/>
							</div>
							<div className="help-block with-errors text-danger"></div>
						</div>
						<div className="row col-md-12">
							<Link to="/MainMenu">
								<button type="button" className="popupbtn" onClick={this.handleLoginClick}>Signup</button>
							</Link>
						</div>
					</form>
				</div>
			</Popup>
		);
	}
}

export default SignupPopup;
