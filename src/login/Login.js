//@flow strict

import * as React from 'react';
import '../Main.css';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import ResendEmailPopup from './ResendEmailPopup.js';
import InfoPopup from './InfoPopup.js';
import Leaderboard from '../globalComponents/Leaderboard.js';
import Cookies from 'universal-cookie';

// Main login page. Front-page of Fortuna.
class Login extends React.Component<{||}> {

	onEmailRegistered(registeredUsername: string, registeredPassword: string): void {
		this.refs.loginPopup.onEmailRegistered(registeredUsername, registeredPassword);
	}

	render(): React.Node {

		// Check if the user already has logged in previously.
		const cookie = new Cookies();
		let loginButton = (<LoginPopup ref="loginPopup" />);
		if(cookie.get('token')) {
			loginButton = (
				<Link to="MainMenu">
					<button className='primarybtn'>Login</button>
					<br/>
				</Link>
			);
		}

		return (
			<div id="Parent">
				<div className="column loginleft align-middle">
					<Leaderboard />
				</div>
				<div className="column loginmiddle">
					<h1>FORTUNA</h1>
					<h6>Welcome Commander</h6>
					{loginButton}
					<br/>
					<SignupPopup 
						onEmailRegisteredCallback={(email: string, password: string) => this.onEmailRegistered(email, password)}
					/>
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
