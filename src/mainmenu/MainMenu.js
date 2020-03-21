//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../globalComponents/Navbar.js';
import { getUser } from '../globalComponents/userAPIIntegration';
import { getAllUsersTanks } from '../globalComponents/tankAPIIntegration';
import { getOptionsOfType } from '../armory/GetInventoryInfo.js';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	test(): void {
		const responsePromise = getAllUsersTanks();
		
		responsePromise.then (
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					console.log(data[0]._id);
				}
			})
		)
	}

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
				 	<Link to="Marketplace">
						<button type="button" className="btn">Marketplace</button>
					</Link>
				</div>
				<div className="column menumiddle">
				<h6>Enter your tanks into the Battle Arena.</h6>
					<Link to="BattleArena">
						<button type="button" className="btn">Battle Arena</button>
					</Link>
				</div>
				<div className="column menuright">
				<h6>Customize your tank.</h6>
					<Link to="Armory">
						<button type="button" className="btn">Armory</button>
					</Link>
					<button onClick={this.test}>Test</button>
				</div>
			</div>
		);
	}
}

export default MainMenu;
