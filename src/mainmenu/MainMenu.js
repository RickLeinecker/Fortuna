//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar styleName="navbtn" linkName="/Login" returnName="Back to Login" pageName="Main Menu" userName="FRIcker | $465128"/>
 				<div className="row styleForRow">
					<div className="col text-center">
						<Link to="/BattleArena">
							<button type="button" class="btn btn-primary">Battle Arena</button>
						</Link>
					</div>
				</div>
				<div className="row styleForRow">
					<div className="col text-center">
						<button type="button" className="btn btn-info">Training Arena</button>
					</div>
				</div>
				<div className="row styleForRow">
					<div className="col text-center">
						<Link to="/Marketplace">
							<button type="button" className="btn btn-info">Marketplace</button>
						</Link>
					</div>
				</div>
				<div className="row styleForRow">
					<div className="col text-center">
						<Link to="/Casus">
							<button type="button" className="btn btn-info">Armory</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default MainMenu;
