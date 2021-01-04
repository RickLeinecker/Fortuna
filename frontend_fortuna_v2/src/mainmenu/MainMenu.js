//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	constructor() {
		super();
		verifyLogin();
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<MainNavbar 
					linkName="/Login" 
					returnName="Logout" 
					pageName="Main Menu" 
				/>
				<h1 className="menuheader">Where to Commander?</h1>
 				<div className="column menuleft">
				 	<Link to={verifyLink("/Marketplace")}>
						<button className="mainMenuBtn">Marketplace</button>
					</Link>
				</div>
				<div className="column menumiddle">
					<Link to={verifyLink("/BattleArena")}>
						<button className="mainMenuBtn">Battle Arena</button>
					</Link>
					<br/><br/><br/>
					<Link to={verifyLink("/TrainingArena")}>
						<button className="mainMenuBtn">Training Arena</button>
					</Link>
				</div>
				<div className="column menuright">
					<Link to={verifyLink("/Armory")}>
						<button className="mainMenuBtn">Armory</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default MainMenu;
