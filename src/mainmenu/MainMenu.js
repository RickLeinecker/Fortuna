//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="Login" returnName="Back to Login" pageName="Main Menu" userName="FRIcker | $465128"/>
				<h1 className="menuheader">Where to Commander?</h1>
 				<div className="column menuleft">
					<h6>Buy and sell tank parts.</h6>
				 	<Link to="Marketplace">
						<button type="button" className="btn">Marketplace</button>
					</Link>
				</div>
				<div className="column menumiddle">
				<h6>Combat your tanks against Bots or other Commanders.</h6>
					<Link to="BattleArena">
						<button type="button" class="btn">Battle Arena</button>
					</Link>
				</div>
				<div className="column menuright">
				<h6>Customize your tank and its code.</h6>
					<Link to="Armory">
						<button type="button" className="btn">Armory</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default MainMenu;
