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

  componentDidMount() {
    document.body.style.fontFamily = "font-family: 'Press Start 2P', cursive;"
  }
style = {
	fontFamily: '"Press Start 2P", cursive',
	fontSize: 14,
	color:"white",
	backgroundColor: "rgba(0,0,0,.5)",
	border: "4px solid #1969e5"
}
title = {
		fontSize: 48
}
leaderboard = {

	left: "60px"
}
	render(): React.Node {


		return (
			<div className='background-image'>
				<div className="column loginleft ">
					<h4 className="infotextLogin">The Hall of Champions</h4>
					<div className= "loginleader" style={this.leaderboard}>
						<Leaderboard />
					</div>
				</div>
				<div className="column loginmiddle">
					<br/><br/><br/>
					<h1 style={this.title}>FORTUNA</h1>
					<br/><br/><br/><br/><br/>
					<div className="middlecolumn">
						<LoginPopup ref="loginPopup" />
						<br/>
						<SignupPopup
							onEmailRegisteredCallback={(email: string, password: string) => this.onEmailRegistered(email, password)}
						/>
						<br/>
					</div>
				</div>
				<div className="column loginright">

					<InfoPopup />
					<p style={this.style}>
						<br/>
						Fortuna is a tank simulation game available online for FREE, based
						on the book "The Birth of Jai", written by Richard Leinecker.
						<br/><br/>
						Players can build, customize, and program their tanks for
						prize money in order to upgrade their tanks, build new strategies,
						and fight for a spot in the legendary Hall of Champions.
						<br />
						<br />
					</p>
				</div>
				<br/><br/>
        <div className="footer">
          <p>Photo credit: <a href="https://www.artstation.com/artwork/GXwZgz">ArtStation</a></p>
        </div>
			</div>
		);
	}
}

export default Login;
