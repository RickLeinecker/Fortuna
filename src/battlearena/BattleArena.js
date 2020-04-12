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
import { prepare3v3APICall, prepare1v1APICall } from '../globalComponents/apiCalls/prepareMatchAPICall.js';
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import { ToastContainer , toast } from 'react-toastify';
import Replays from './Replays.js';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';

import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';

type Props = {||};

type State = {|
	selectedTankOne: ?Tank,
	selectedTankTwo: ?Tank,
	selectedTankThree: ?Tank,
	allTanks: Array<Tank>,
	userElo: number,
	battleType: BattleType
|};

class BattleArena extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		this.state = {
			selectedTankOne: null,
			selectedTankTwo: null,
			selectedTankThree: null,
			allTanks: [],
			userElo: 0,
			battleType: '1 vs 1'
		};
	}

	componentDidMount(): void {
		getAllUsersTanks(allTanks => {
			this.setState({
				allTanks: allTanks,
				selectedTankOne: getPreferredSelectedTank(allTanks)
			});
		});
		getReplayListAPICall(() => {});
	}

	onChallengePlayer(player: ?User): void {
		setReturnToFromBattlegroundLink('/BattleArena');

		// Check if there is no player that is able to be challenged.
		if (player == null) {
			toast.error('No player found.');
			return;
		}

		// Ensure that the user has at least one set tank.
		const myTankOne: ?Tank = this.state.selectedTankOne;
		const myTankTwo: ?Tank = this.state.selectedTankTwo;
		const myTankThree: ?Tank = this.state.selectedTankThree;
		if (myTankOne == null && myTankTwo == null && myTankThree == null) {
			toast.error('No selected tank for challenging!');
			return;
		}

		if (this.state.battleType === '1 vs 1') {
			if (myTankOne == null) {
				toast.error('No tank selected!');
				return;
			}
			prepare1v1APICall(myTankOne, player, matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				//TODO: select an appropriate arena depending on the match
				setBattlegroundArena('DIRT');
				window.location.href=verifyLink('/Battleground');
			});
		}
		else {
			prepare3v3APICall(myTankOne, myTankTwo, myTankThree, player, matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				//TODO: select an appropriate arena depending on the match
				setBattlegroundArena('DIRT');
				window.location.href=verifyLink('/Battleground');
			});
		}
	}


	render(): React.Node {
		return (
		<div id="Parent">
			<Navbar
				returnName="Back to Main Menu" 
				pageName="Battle Arena" 
				linkName="/MainMenu"
				youtubeLinks={["https://www.youtube.com/watch?v=9lGqrj6_X7Y"]}
 			/>
			<div className="column baleft">
				<h5>Challenge a Player</h5>
				<ChallengePlayerPopup 
					onChallengePlayer={(user) => this.onChallengePlayer(user)}
					playerChallenged={null}
					battleType={this.state.battleType}
				/>
				<SearchPlayers 
					onChallengePlayer={(user) => this.onChallengePlayer(user)}
					battleType={this.state.battleType}
				/>
			</div>
			<div className="column bamiddle">
				<h5>Choose your Tank{this.state.battleType === '1 vs 1' ? '' : 's'}, Commander</h5>
				<br/>
				{(this.state.battleType === '1 vs 1') ?
					<div>
						<SelectTank
							selectedTank={this.state.selectedTankOne}
							allTanks={this.state.allTanks}
							changeSelectedTank={(tank) => this.setState({selectedTankOne: tank})}
							propogateChangesToCasus={true}
						/>
						{this.state.selectedTankOne == null ? <div className="emptyTankBig"></div> : <TankDisplay tankToDisplay={this.state.selectedTankOne} smallTank={false} />}
					</div> :
					<div className="threeTankDisplay">
						<table>
							<thead>
								<tr>
									<th>
										<SelectTank
											selectedTank={this.state.selectedTankTwo}
											allTanks={this.state.allTanks.filter(tank => tank !== this.state.selectedTankOne && tank !== this.state.selectedTankThree)}
											changeSelectedTank={(tank) => this.setState({selectedTankTwo: tank})}
											propogateChangesToCasus={false}
										/>
									</th>
									<th>
										<SelectTank
											selectedTank={this.state.selectedTankOne}
											allTanks={this.state.allTanks.filter(tank => tank !== this.state.selectedTankThree && tank !== this.state.selectedTankTwo)}
											changeSelectedTank={(tank) => this.setState({selectedTankOne: tank})}
											propogateChangesToCasus={false}
										/>
									</th>
									<th>
										<SelectTank
											selectedTank={this.state.selectedTankThree}
											allTanks={this.state.allTanks.filter(tank => tank !== this.state.selectedTankOne && tank !== this.state.selectedTankTwo)}
											changeSelectedTank={(tank) => this.setState({selectedTankThree: tank})}
											propogateChangesToCasus={false}
										/>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{this.state.selectedTankTwo == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={this.state.selectedTankTwo} smallTank={true} />}
										
									</td>
									<td>
										{this.state.selectedTankOne == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={this.state.selectedTankOne} smallTank={true} />}
									</td>
									<td>
										{this.state.selectedTankThree == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={this.state.selectedTankThree} smallTank={true} />}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				}
				<h5>Current Battle Type: {this.state.battleType}</h5>
				<button 
					className="primarybtn" 
					onClick={(this.state.battleType === '1 vs 1') ? () => this.setState({battleType: '3 vs 3'}) : () => this.setState({battleType: '1 vs 1'})}
				>
					Change Battle Type
				</button>
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
