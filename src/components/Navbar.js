//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';

// Navbar component. Displays back button and player's name and currency.
//
// The Navbar has 3 columns:
// The left column is the back button.
// PROPNAME = "returnName", "linkName" for what page to link to, and "styleName" for the buttons style.
// The middle column is the current page name. PROPNAME = "pageName".
// The right column is the player's name and current currency. PROPNAME = "userName".
//
// EXAMPLE PROP USAGE = <Navbar styleName="navbtn" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker | $465128"/>
//
// Right column needs to be updated to have the logged in user's name and current currency passed to it.
class Navbar extends React.Component<Props> {
	render(): React.Node {
		return (
			<div className="navbar">
				<div className="navleft">
					<Link to={this.props.linkName}>
						<button type="button" className={this.props.styleName}>&#60;&#45; {this.props.returnName}</button>
					</Link>
				</div>
				<div className="navmiddle">
					<h4>{this.props.pageName}</h4>
				</div>
				<div className="navright">
					<h5>{this.props.userName}</h5>
				</div>
			</div>
		)
	}
}

export default Navbar;