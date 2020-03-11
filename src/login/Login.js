//@flow strict

import * as React from 'react';
import '../Main.css';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import InfoPopup from './InfoPopup.js';
import Leaderboard from '../globalComponents/Leaderboard.js';

// Main login page. Front-page of Fortuna.
class Login extends React.Component<{||}> {

	onEmailRegistered(registeredEmail: string, registeredPassword: string): void {
		this.refs.loginPopup.onEmailRegistered(registeredEmail, registeredPassword);
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<div className="column loginleft align-middle">
					<Leaderboard />
				</div>
				<div className="column loginmiddle">
					<h1>FORTUNA</h1>
					<h6>Welcome Commander</h6>
					<LoginPopup ref="loginPopup"/>
					<br/>
					<SignupPopup 
						onEmailRegisteredCallback={(email: string, password: string) => this.onEmailRegistered(email, password)}
					/>
				</div>
				<div className="column loginright">
					<InfoPopup />
				</div>
			</div>
		);
	}
}

export default Login;
