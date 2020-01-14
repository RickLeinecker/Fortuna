//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainMenu.css';

// Main Menu component.
class MainMenu extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div id="Parent">
				<div className="row styleForRow">
					<div className="col-md-4">
						<Link to="/Login">
							<button type="button" className="btn btn-secondary btn-lg">&lt;- Back to Login</button>
						</Link>
					</div>
					<h1 className="col-md-4 text-center">Main Menu</h1>
				</div>
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
