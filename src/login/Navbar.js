//@flow strict

import * as React from 'react';
import '../Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Navbar component. Displays back button and player's name and currency.
//
// The Navbar has 3 columns:
// The left column is the back button.
// The middle column is the current page name.
// The right column is the player's name and current currency.
//
// The columns must be customized for each page this component is used for.
class Navbar extends React.Component<{||}> {
	render(): React.Node {
		return (
			<div className="topnav">
				<div className="navleft">
					<button type="button" className="navbtn">&#60;&#45; Leave</button>
				</div>
				<div className="navmiddle">
					<h4>Login</h4>
				</div>
				<div className="navright">
					<h5>Johnston: $55624</h5>
				</div>
			</div>
		)
	}
}

export default Navbar;