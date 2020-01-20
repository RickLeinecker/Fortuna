//@flow strict

import * as React from 'react';
import '../Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import InfoPopup from './InfoPopup.js';


// Main login page. Front-page of Fortuna.
class Login extends React.Component<{||}> {
	render(): React.Node {
		return (
			<div id="Parent">
				<div className="column left">
					<div className="leaderboard">
						<h4>Leaderboard</h4>
						<h6>1.  Long Johnson Boy</h6>
						<h6>2.  XxK1ll3rxX</h6>
						<h6>3.  momma</h6>
						<h6>4.  Lord of Weiner</h6>
						<h6>5.  animeluver</h6>
						<h6>6.  Zezima</h6>
						<h6>7.  Mark Zuckerberg</h6>
						<h6>8.  Long Johnson Boy2</h6>
						<h6>9.  34910020999</h6>
						<h6>10. Training Bot 3</h6>
					</div>
				</div>
				<div className="column middle">
					<h1>FORTUNA</h1>
					<h6>Welcome Commander</h6>
					<LoginPopup/>
					<br/>
					<SignupPopup/>
				</div>
				<div className="column right">
					<h4>To understand this project:</h4>
					<InfoPopup />
				</div>
			</div>
		);
	}
}

export default Login;
