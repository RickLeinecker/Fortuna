//@flow strict

import * as React from 'react';
import './Login.css';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import ResendEmailPopup from './ResendEmailPopup.js';
import InfoPopup from './InfoPopup.js';
import Leaderboard from '../globalComponents/Leaderboard.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';

// Main login page. Front-page of Fortuna.
class Login extends React.Component<{||}> {

	constructor() {
		super();
		verifyLogin();
	}

	onEmailRegistered(registeredUsername: string, registeredPassword: string): void {
		this.refs.loginPopup.onEmailRegistered(registeredUsername, registeredPassword);
	}

	render(): React.Node {
		return (
			<div>
				<div className="column loginleft align-middle">
					<Leaderboard />
				</div>
				<div className="column loginmiddle">
					<h1>FORTUNA</h1>
					<h6>Welcome Commander</h6>
					<div className="inline">
					<LoginPopup ref="loginPopup" />
					<br/>
					<SignupPopup 
						onEmailRegisteredCallback={(email: string, password: string) => this.onEmailRegistered(email, password)}
					/>
					</div>
					<br/>
					<br/>
					<ResendEmailPopup/>
				</div>
				<div className="column loginright">
					<InfoPopup />
				</div>
			</div>
		);
	}
}

export default Login;
