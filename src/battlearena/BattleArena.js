//@flow strict

import './BattleArena.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import Leaderboard from '../globalComponents/Leaderboard.js';
import SearchPlayers from './SearchPlayers.js';
import ChallengePlayerPopup from './ChallengePlayerPopup.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';
import SelectTank from '../globalComponents/SelectTank.js';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import TankDisplay from '../tanks/TankDisplay.js';
import User from '../globalComponents/typesAndClasses/User.js';
import prepareMatchAPICall from '../globalComponents/apiCalls/prepareMatchAPICall.js';
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import { ToastContainer , toast } from 'react-toastify';
import Replays from './Replays.js';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';

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
			//TODO: select an appropriate arena depending on the match
			setBattlegroundArena('DIRT');
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
				<h5>Challenge a Player</h5>
				<ChallengePlayerPopup 
					onChallengePlayer = {(user) => this.onChallengePlayer(user)}
					playerChallenged = {null}
				/>
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
				<br/><br/>
				<Replays />
			</div>
			<ToastContainer />
		</div>
		);
	}
}

export default BattleArena;
