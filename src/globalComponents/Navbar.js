//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import type { LinkType } from './LinkType.js';

type Props = {
	linkName?: LinkType,
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
//
// Need to implement API call for user's name and currency.
class Navbar extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			userName: "",
			userCurrency: 0
		}
	}

	componentDidMount(): void {
		
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
					console.log(data);
					this.setState({userName: data.userName, userCurrency: data.money});
				}
			})
		)

		/*
		const body = responsePromise.text();
		const jsonObjectOfUser = JSON.parse(body);
		
		// Set the users name and currency.
		this.setState({userName:jsonObjectOfUser.userName});
		this.setState({userCurrency: jsonObjectOfUser.money});
		*/
	}

	render(): React.Node {

		const link = (this.props.linkName==null || this.props.returnName==null) ? null : (
			<Link to={this.props.linkName}>
				<button type="button" className="navbtn">&#60;&#45; {this.props.returnName}</button>
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
