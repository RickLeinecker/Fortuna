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
import SelectTank from '../armory/SelectTank.js';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks } from '../globalComponents/tankAPIIntegration.js';

type Props = {||};

type State = {|
	selectedTank: ?Tank,
	allTanks: Array<Tank>
|};

class BattleArena extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		this.state = {
			selectedTank: null,
			allTanks: [],
		}
	}

	componentDidMount(): void {
		getAllUsersTanks((successful, allTanks) => {
			if (successful) {
				this.setState({
					allTanks: allTanks,
					selectedTank: allTanks[0]
				});
			}
		});
	}

	onChallengePlayer(player: string): void {
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
				<SelectTank
					allTanks={this.state.allTanks}
					changeSelectedTank={(tank) => {}}
				/>
			</div>
			<div className="column baright">
				<Leaderboard />
			</div>
		</div>
		);
	}
}

export default BattleArena;
