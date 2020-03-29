//@flow strict

import './BattleArena.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../globalComponents/Navbar.js';
import Leaderboard from '../globalComponents/Leaderboard.js';
import SearchPlayers from './SearchPlayers.js';
import ChallengePlayerPopup from './ChallengePlayerPopup.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';

type Props = {||};

type State = {|
	selectedTank: string;
|};

class BattleArena extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
	}

	onChallengePlayer(player: string) {
		setReturnToFromBattlegroundLink('/BattleArena');

		console.log(player);

		// If statement encapsulates search challenge.
		if(player !== "") {
			// NEED TO CHALLENGE THE PLAYER NAMED
		}

		// NEED TO GET PLAYER LIST AND CHOOSE RANDOM PLAYER.

		window.location.href=verifyLink('/Battleground');
	}

	render(): React.Node {
		return (
		<div id="Parent">
			<Navbar
				returnName="Back to Main Menu" 
				pageName="Battle Arena" 
				linkName="/MainMenu"
 			/>
			<div className="column baleft">
				<h3>Find First Challenger Available</h3>
				<ChallengePlayerPopup 
					onChallengePlayer={this.onChallengePlayer}
					playerChallenged="" 
				/>
				<h6>Practice Against Bots</h6>
				<Link to={verifyLink("/TrainingArena")}>
					<button type="button" className="btn">Training Arena</button>
				</Link>
				<SearchPlayers onChallengePlayer={this.onChallengePlayer} />
			</div>
			<div className="column bamiddle">
				<h5>Choose your Tank, Commander</h5>
				<select className="dropdownMenu">
					<option defaultValue>Select a Tank</option>
					<option value="1">Child Consumer</option>
					<option value="2">Fast Bang</option>
					<option value="3">Biggest Gun</option>
				</select>
			</div>
			<div className="column baright">
				<Leaderboard />
			</div>
		</div>
		);
	}
}

export default BattleArena;
