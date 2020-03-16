//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../globalComponents/Navbar.js';
import { verifyLogin } from '../globalComponents/verifyLogin.js';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="Login" 
					returnName="Logout" 
					pageName="Main Menu" 
				/>
				<h1 className="menuheader">Where to Commander?</h1>
 				<div className="column menuleft">
					<h6>Buy and sell tank parts.</h6>
				 	<Link to={verifyLogin("Marketplace")}>
						<button type="button" className="btn">Marketplace</button>
					</Link>
				</div>
				<div className="column menumiddle">
				<h6>Enter your tanks into the Battle Arena.</h6>
					<Link to={verifyLogin("BattleArena")}>
						<button type="button" className="btn">Battle Arena</button>
					</Link>
				</div>
				<div className="column menuright">
				<h6>Customize your tank.</h6>
					<Link to={verifyLogin("Armory")}>
						<button type="button" className="btn">Armory</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default MainMenu;
