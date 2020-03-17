//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import type { LinkType } from './LinkType.js';
import { verifyLink } from './verifyLink.js';

type Props = {
	linkName: LinkType,
	returnName?: string,
	pageName: string
}

type State = {
	userName: string,
	userCurrency: number
}

// Navbar component. Displays back button and player's name and currency.
// The Navbar has 3 columns:
// The left column is the back button.
// The middle column is the current page name.
// The right column is the player's name and current currency.
//
// Prop names:
// linkName (where the back button will take you; leave blank if there is no back option)
// returnName (takes text for describing the back button; leave blank if there is no back option)
// pageName (takes a title for top of the page)
//
// State names:
// userName (takes API call for logged in user's name)
// userCurrency (takes API call for logged in user's currency)
//
// EXAMPLE PROP USAGE = <Navbar linkName="Mainmenu" returnName="Back to Main Menu" pageName="Armory" />

class Navbar extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		// Get initial money from cookies.
		const cookies = new Cookies();
		this.state = {
			userName: cookies.get('userName'),
			userCurrency: cookies.get('money')
		}
	}

	// Once mounted, set the cookie to store user's name and money.
	componentDidMount(): void {
		this.setCookie();
	}

	// Check if the back button will logout the user.
	handleLogout(): void {

		// If the user isn't logging out, leave this function.
		if(this.props.returnName !== 'Logout') {
			return;
		}

		// Delete All cookies. 
		const cookie = new Cookies();
		for(let cookieName of Object.keys(cookie.getAll())) {
			cookie.remove(cookieName);
		}
	}

	// Set user's name and money in the state and in a cookie.
	setCookie(): void {
		
		// Set the cookie and update state.
		const cookies = new Cookies();
		const token = cookies.get('token');
		const responsePromise: Promise<Response> = fetch('/api/user/getUser', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
		});
		responsePromise.then (
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
				}
				else {
					cookies.set('userName', data.userName);
					cookies.set('money', data.money);
					this.setState({userName: data.userName, userCurrency: data.money});
				}
			})
		)
	}

	render(): React.Node {

		const link = (this.props.linkName==null || this.props.returnName==null) ? null : (
			<Link to={verifyLink(this.props.linkName)}>
				<button onClick={this.handleLogout.bind(this)} className="navbtn">&#60;&#45; {this.props.returnName}</button>
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
					<h5>{this.state.userName} | ${this.state.userCurrency}</h5>
				</div>
			</div>
		)
	}
}

export default Navbar;
