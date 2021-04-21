//@flow strict
import * as React from 'react';
import './Login.css';
import Popup from 'reactjs-popup';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import { ToastContainer , toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import setLoginToken from '../globalComponents/setLoginToken.js';
import { verifyLink } from '../globalComponents/verifyLink.js';


type Props = {|
	onEmailRegisteredCallback: (string, string) => void
|};

type State = {|
	userName: string,
	email: string,
	password: string,
	confirmPassword: string,
	email: string,
	dob: boolean,
	signupDialogOpen: boolean
|};


// Signup Popup component. Display Signup Form.
class SignupPopup extends React.Component<Props, State> {

	constructor() {
		super();

		this.state = {
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',
			dateofbirth: '',
			birthMonth: '',
			birthDay: '',
			birthYear: '',
			signupDialogOpen: false
		}
	}

	handleSignUpClick(): void {
		if (this.state.password !== this.state.confirmPassword) {
			toast.error('Passwords do not match!');
			return;
		}

		// Check length, if more than 8 chars, will ruin the Top 10 box formatting.
		if (this.state.userName.length > 9 || this.state.userName.length < 3) {
			toast.error('Username must be between 3 and 8 characters.');
			return;
		}

		const hasWhiteSpace = (s) => {
			return /\s/g.test(s);
		}

		if (hasWhiteSpace(this.state.userName)) {
			toast.error('Username must not have any spaces.');
			return;
		}

		// Age verification
		const birthDate = new Date(this.state.birthYear, (+this.state.birthMonth-1), this.state.birthDay)
		const today = new Date(Date.now());
		const isValidDate = (Boolean(+birthDate) && this.state.birthYear > (today.getFullYear() - 150) && this.state.birthYear <= today.getFullYear() && birthDate.getDate() == this.state.birthDay && birthDate.getMonth() == (this.state.birthMonth-1));

		if (!isValidDate) {
			toast.error('Invalid Birthday');
			return;
		}

		const ageMs = today - birthDate;
		const ageDate = new Date(ageMs);
		const age = ageDate.getUTCFullYear() - 1970;

		if(age < 0) {
			toast.error('No time-travellers allowed');
			return;
		}
		else if (age < 13) {
			toast.error('You must be 13 years or older to play Fortuna');
			return;
		}

		const responsePromise: Promise<Response> = fetch('/api/user/registerUser', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({
				userName: this.state.userName,
				email: this.state.email,
				password:this.state.password }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 201) {
					console.log(response.status);
					console.log(data);
					toast.error(getErrorFromObject(data));
				}
				else {
					console.log(data);
					this.props.onEmailRegisteredCallback(this.state.userName, this.state.password);
					this.setState({signupDialogOpen: false});
				}
			})
		).catch(
			(error) => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	handleCancelClick(): void {
		this.setState({signupDialogOpen: false});
	}

  // put user email in db
  responseSuccessGoogle = (res) => {

    this.setState({ userName:  res.profileObj.givenName, email: res.profileObj.email, password: res.googleId });
    
    const responsePromise: Promise<Response> = fetch('/api/user/googlelogin', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({
				userName: this.state.userName,
				email: this.state.email,
				password:this.state.password,
        		tokenId: res.tokenId
       }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data);
					toast.error(getErrorFromObject(data));
				}
				else {
					console.log(data);
					this.props.onEmailRegisteredCallback(this.state.userName, this.state.password, true);
          			setLoginToken(data.token);
					window.location=verifyLink('/MainMenu');
				}
			})
		).catch(
			(error) => {
				toast.error('error');
				console.log(error);
			}
		);
  }

  responseErrorGoogle = (response) => {
    console.log(response);
    if (response.error === "popup_closed_by_user") {
        toast.error('Error signing in with Google')
    }
  }


	render(): React.Node {
		return (
			<div title="signRoot">
				<button type="button" className="loginbtn" onClick={() => this.setState({signupDialogOpen: true})}>
					<div className="logintext">
						Signup
					</div>
				</button>
				<Popup
					open={this.state.signupDialogOpen}
					onClose={() => this.handleCancelClick()}
				>
					<div className="popup">
						<h3>Signup</h3>
						<div>
							<label>Email</label>
							<div className="input-group">
								<input
									type="text"
									className="inputText"
									onChange={e => this.setState({ email: e.target.value})}
								/>
							</div>
						</div>
						<div>
							<label>Username</label>
							<div className="input-group">
								<input
									type="text"
									className="inputText"
									onChange={e => this.setState({ userName: e.target.value})}
								/>
							</div>
						</div>
						<div>
							<label>Password</label>
							<div className="input-group">
								<input
									type="password"
									className="inputText"
									onChange={e => this.setState({ password: e.target.value})}
								/>
							</div>
						</div>
						<div>
							<label>Confirm Password</label>
							<div className="input-group">
								<input
									type="password"
									className="inputText"
									onChange={e => this.setState({confirmPassword: e.target.value})}
								/>
							</div>
						</div>
						<div>
							<label id="DOBlabel">Date of Birth <br/> Month  Day  Year</label>
							<div className="input-group" >
						     <input id="month"
							     type="text"
								className="inputText"
								placeholder="MM"
							     name="month"
							     maxLength="2"
							     onChange={e => this.setState({ birthMonth: e.target.value})}
						     />
						     <input id="day"
							     type="text"
								className="inputText"
								placeholder="DD"
							     name="day"
							     maxLength="2"
							     onChange={e => this.setState({ birthDay: e.target.value})}
						     />
          					<input id="year"
							     type="text"
								className="inputText"
								placeholder="YYYY"
						          name="year"
						          maxLength="4"
						          onChange={e => this.setState({ birthYear: e.target.value})}
					     	/>
							</div>
						</div>
						<br/>
						<div>
							<button className="popupbtn" onClick={() => this.handleSignUpClick()}>
								Signup
							</button>
							<button className="cancelbtn" onClick={() => this.handleCancelClick()}>
								Cancel
							</button>
						</div>
					</div>
				</Popup>
        <br/>
        <br/>
        <GoogleLogin
          clientId="670405012008-c48tglusfd73a6qthu0uhf2skj97s5a9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseSuccessGoogle}
          onFailure={this.responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (

          	<button type="button" className="loginbtn" style={{color: "white"}} onClick={renderProps.onClick}>Login With Google</button>
          )}
        />

				<ToastContainer />
			</div>
		);
	}
}

export default SignupPopup;
