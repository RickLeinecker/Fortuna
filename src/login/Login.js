//@flow strict

import * as React from 'react';
import '../Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import InfoPopup from './InfoPopup.js';
import Leaderboard from '../components/Leaderboard.js';
import Navbar from '../components/Navbar.js';

// Main login page. Front-page of Fortuna.
class Login extends React.Component<{||}> {
	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="nobtn" pageName="Welcome" userName="FRIcker | $465128"/>
				<div className="column left">
					<Leaderboard leaderNames={ ["John", "Bill", "Suck", "Big Suck", "HEhaw", "XXXXXfweckerXXXXX", "Yes", "2more", "9", "10haha"] } />
				</div>
				<div className="column middle">
					<h1>FORTUNA</h1>
					<h6>Welcome Commander</h6>
					<LoginPopup />
					<br/>
					<SignupPopup />
				</div>
				<div className="column right">
					<InfoPopup />
				</div>
			</div>
		);
	}
}

export default Login;
