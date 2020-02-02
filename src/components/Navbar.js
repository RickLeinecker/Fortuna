//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';

import type {LinkType} from './LinkType.js';

type Props = {
	styleName: string,
	linkName?: LinkType,
	returnName?: string,
	pageName: string,
	userName: string
}

// Navbar component. Displays back button and player's name and currency.
// The Navbar has 3 columns:
// The left column is the back button.
// The middle column is the current page name.
// The right column is the player's name and current currency.
//
// Prop names:
// styleName (takes the CSS style for the back button, two options are navbtn and nobtn)
// linkName (where the back button will take you; leave blank if there is no back option)
// returnName (takes text for describing the back button; leave blank if there is no back option)
// pageName (takes a title for top of the page)
// userName (takes user's name and currency)
//
// EXAMPLE PROP USAGE = <Navbar styleName="navbtn" linkName="Mainmenu" returnName="Back to Main Menu" pageName="Armory" userName="FRIcker | $465128"/>
//
// Right column needs to be updated to have the logged in user's name and current currency passed to it.
class Navbar extends React.Component<Props> {

	render(): React.Node {
		const link = (this.props.linkName==null || this.props.returnName==null) ? null : (
			<Link to={this.props.linkName}>
				<button type="button" className={this.props.styleName}>&#60;&#45; {this.props.returnName}</button>
			</Link>
		);

		return (
			<div className="navbar">
				<div className="navleft">
					{link}	
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
