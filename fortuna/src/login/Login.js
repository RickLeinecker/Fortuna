//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import './Login.css';

class Login extends React.Component<Props,State> {
	render(): React.Node {
		return (
			<div id="Parent">
				<div className="row">
					<div className="column left">
						<h4>Leaderboard</h4>
					</div>
					<div className="column middle">
						<h1>Fortuna</h1><h6>Welcome Commander</h6>
						<LoginPopup/>
						<SignupPopup/>
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
