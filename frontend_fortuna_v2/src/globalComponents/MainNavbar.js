//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import type { LinkType } from './typesAndClasses/LinkType.js';
import { verifyLink } from './verifyLink.js';
import getUserAPICall from './apiCalls/getUserAPICall.js';
import YoutubeVideoPopup from './YoutubeVideoPopup.js';

import { Navbar, Form, Nav, NavDropdown, Button, FormControl } from 'react-bootstrap'

type Props = {
	linkName: LinkType,
	returnName?: string,
	pageName: string,
	youtubeLinks?: Array<string>
}

type State = {
	username: string,
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
// username (takes API call for logged in user's name)
// userCurrency (takes API call for logged in user's currency)
//
// EXAMPLE PROP USAGE = <Navbar linkName="Mainmenu" returnName="Back to Main Menu" pageName="Armory" />

class MainNavbar extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		// Get initial money from cookies.
		const cookies = new Cookies();
		this.state = {
			username: cookies.get('username'),
			userCurrency: cookies.get('money')
		}
	}

	// Once mounted, set the cookie to store user's name and money.
	componentDidMount(): void {
		this.reloadNavbar();
	}

	// Check if the back button will logout the user.
	handleLogout(): void {

		// If the user isn't logging out, leave this function.
		if(this.props.returnName !== 'Logout') {
			return;
		}

		// Delete All cookies.
		const cookie = new Cookies();
		for(const cookieName of Object.keys(cookie.getAll())) {
			cookie.remove(cookieName);
		}

		window.location = verifyLink('/Login');
	}

	reloadNavbar(): void {
		getUserAPICall(user => {
			const cookies = new Cookies();
			cookies.set('username', user.username);
			cookies.set('money', user.money);
			this.setState({username: user.username, userCurrency: user.money});
		});
	}

	//Youtube links need to be formatted to play within our domain
	formatYoutubeLink(link: string): string {
		return 'https://www.youtube.com/embed/' + link.slice(link.indexOf('=')+1);
	}

  divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

	render(): React.Node {

		const link = (this.props.linkName==null || this.props.returnName==null) ? null : (
			<Link to={verifyLink(this.props.linkName)}>
				<button onClick={this.handleLogout.bind(this)} className="navbtn">&#60;&#45; {this.props.returnName}</button>
			</Link>
		);

		const youtubeLinks = (this.props.youtubeLinks==null) ? <div></div> : (
			<YoutubeVideoPopup youtubeVideoLinks={
				this.props.youtubeLinks.map(l => this.formatYoutubeLink(l))
			}/>
		);

		return (
      // <Navbar bg="#04213F" expand="lg">
      //   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //   <Navbar.Collapse id="basic-navbar-nav">
      //     <Nav className="mr-auto">
      //       <Nav.Link href="#home">Home</Nav.Link>
      //       <Nav.Link href="#link">Link</Nav.Link>
      //     </Nav>
      //   </Navbar.Collapse>
      // </Navbar>
      <div className="navbar">
      <div className="navleft">
        <div className="row rowPadding">
          {link}&emsp;
          {youtubeLinks}
        </div>
      </div>
      <div className="navmiddle">
	   <h4>{this.props.pageName}</h4>
	   <Link to={verifyLink("/MainMenu")}>
	     <button className="navbtn">Home</button>
	   </Link>
	   <Link to={verifyLink("/BattleArena")}>
	     <button className="navbtn">Play</button>
	   </Link>
	   <Link to={verifyLink("/Armory")}>
	     <button className="navbtn">Loadout</button>
	   </Link>
	   <Link to={verifyLink("/TrainingArena")}>
	     <button className="navbtn">Training</button>
	   </Link>
	   <Link to={verifyLink("/Marketplace")}>
	     <button className="navbtn">Marketplace</button>
	   </Link>
      </div>
      <div className="navright">
        <h5 style={this.divStyle}>{this.state.username} | ${this.state.userCurrency}</h5>
      </div>
    </div>
		)
	}
}

export default MainNavbar;
