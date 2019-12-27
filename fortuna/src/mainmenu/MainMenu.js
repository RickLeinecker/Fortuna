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
				<div class="row styleForRow">
					<div class="col-md-4">
						<Link to="/Login">
							<button type="button" class="btn btn-secondary btn-lg">&lt;- Back to Login</button>
						</Link>
					</div>
					<h1 class="col-md-4 text-center">Main Menu</h1>
				</div>
 				<div class="row styleForRow">
					<div class="col text-center">
						<button type="button" class="btn btn-primary">Battle Arena</button>
					</div>
				</div>
				<div class="row styleForRow">
					<div class="col text-center">
						<button type="button" class="btn btn-info">Training Arena</button>
					</div>
				</div>
				<div class="row styleForRow">
					<div class="col text-center">
						<Link to="/Marketplace">
							<button type="button" class="btn btn-info">Marketplace</button>
						</Link>
					</div>
				</div>
				<div class="row styleForRow">
					<div class="col text-center">
						<Link to="/Casus">
							<button type="button" class="btn btn-info">Armory</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default MainMenu;
