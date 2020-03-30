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
import TankDisplay from '../tanks/TankDisplay.js';
import User from '../globalComponents/User.js';
import prepareMatchAPICall from '../globalComponents/prepareMatchAPICall.js';
import {setMatchForBattleground} from '../battleground/setTanksToFightInBattleground.js';
import getReplayListAPICall from '../globalComponents/getReplayListAPICall.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {||};

type State = {|
	selectedTank: ?Tank,
	allTanks: Array<Tank>,
	userElo: number
|};

class BattleArena extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		this.state = {
			selectedTank: null,
			allTanks: [],
			userElo: 0,
		};
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
		getReplayListAPICall(() => {});
	}

	onChallengePlayer(player: ?User): void {
		setReturnToFromBattlegroundLink('/BattleArena');

		if (player==null) {
			toast.error('No player found.');
			return;
		}
		const myTank=this.state.selectedTank;
		if (myTank==null) {
			toast.error('No selected tank for challenging.');
			return;
		}

		prepareMatchAPICall(myTank, player, matchId => {
			console.log('Successfully prepared match with id: '+matchId);
			setMatchForBattleground(matchId);
			window.location.href=verifyLink('/Battleground');
		});

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
				<h5>Challenge First Player Available</h5>
				<ChallengePlayerPopup 
					onChallengePlayer = {(user) => this.onChallengePlayer(user)}
					playerChallenged = {null}
				/>
				<h6>Practice Against Bots</h6>
				<Link to={verifyLink("/TrainingArena")}>
					<button type="button" className="btn">Training Arena</button>
				</Link>
				<SearchPlayers onChallengePlayer={(user) => this.onChallengePlayer(user)} />
			</div>
			<div className="column bamiddle">
				<h5>Choose your Tank, Commander</h5>
				{
					this.state.selectedTank==null?<div></div>:
					<TankDisplay tankToDisplay={this.state.selectedTank} />
				}
				<SelectTank
					selectedTank={this.state.selectedTank}
					allTanks={this.state.allTanks}
					changeSelectedTank={(tank) => this.setState({selectedTank: tank})}
				/>
			</div>
			<div className="column baright">
				<Leaderboard />
			</div>
			<ToastContainer />
		</div>
		);
	}
}

export default BattleArena;
