//@flow strict

import './BattleArena.css';
import * as React from 'react';
import MainNavbar from '../globalComponents/MainNavbar.js';
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
import { prepare3v3APICall, prepare1v1APICall, prepare1v1BotAPICall, prepare3v3BotAPICall } from '../globalComponents/apiCalls/prepareMatchAPICall.js';
import { setMatchForBattleground } from '../battleground/setTanksToFightInBattleground.js';
import getReplayListAPICall from '../globalComponents/apiCalls/getReplayListAPICall.js';
import { ToastContainer , toast } from 'react-toastify';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';
import setFirstTimePlayAPICall from "../globalComponents/apiCalls/setFirstTimePlayAPICall";
import getFirstTimePlayAPICall from "../globalComponents/apiCalls/getFirstTimePlayAPICall";
import JoyRide from "react-joyride";
import getMasterAccountId from '../globalComponents/getMasterAccountId.js';
import { getMasterTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import SetWagerPopup from "../armory/SetWagerPopup";
import getLoginToken from '../globalComponents/getLoginToken';

type Props = {||};

type State = {|
	selectedTankOne: ?Tank,
	selectedTankTwo: ?Tank,
	selectedTankThree: ?Tank,
	allTanks: Array<Tank>,
	userElo: number,
	botTanks: Array<Tank>,
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
			battleType: '1 vs 1',
			tour_steps: [
				{
					target: ".battletype",
					disableBeacon: true,
					content: "Change between 1 v 1, or 3 v 3",
				},
				{
					target: ".search",
					content: "Search for a specific player and challenge any tanks they are wagering"
				},
				{
					target: ".wager",
					content: "The minimum wager is $50 and you need to have a tank wagered for others to battle against you!"
				},
				{
					target: ".quickplay",
					content: "Quickly find a match with someone's wagered tank in your ELO rank"
				}
			],
			run: false
		};
		getReplayListAPICall(() => {});

	}

	componentDidMount(): void {
		getAllUsersTanks(allTanks => {
			this.setState({
				allTanks: allTanks,
				selectedTankOne: getPreferredSelectedTank(allTanks)
			});
		});

		getMasterTanks(tanks => {
			this.setState({botTanks: tanks});
		});

		getReplayListAPICall(() => {});

		getFirstTimePlayAPICall((res) => {
			console.log("RES: ", res);
			this.setState({run: res})
			if(this.state.run === true)
			{
				setFirstTimePlayAPICall();

			}
		})


		console.log("THIS IS NOW RUN: " , this.state.run)

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

		if (this.state.battleType === '1 vs 1' && player.userId === getMasterAccountId()) {
			if (myTankOne == null) {
				toast.error('No tank selected!');
				return;
			}
			prepare1v1BotAPICall(myTankOne, player, this.state.botTanks[Math.floor(Math.random() * this.state.botTanks.length)], matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				//TODO: select an appropriate arena depending on the match
				window.location.href=verifyLink('/Battleground');
			});
		}
		else if (this.state.battleType === '1 vs 1') {
			if (myTankOne == null) {
				toast.error('No tank selected!');
				return;
			}
			prepare1v1APICall(myTankOne, player, matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				//TODO: select an appropriate arena depending on the match
				window.location.href=verifyLink('/Battleground');
			});
		}
		else if (this.state.battleType === '3 vs 3' && player.userId === getMasterAccountId()) {
			const botOne = this.state.botTanks[Math.floor(Math.random() * this.state.botTanks.length)];
			const botTwo = this.state.botTanks[Math.floor(Math.random() * this.state.botTanks.length)];
			const botThree = this.state.botTanks[Math.floor(Math.random() * this.state.botTanks.length)];

			prepare3v3BotAPICall(myTankOne, myTankTwo, myTankThree, player, botOne, botTwo, botThree, matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				//TODO: select an appropriate arena depending on the match
				window.location.href=verifyLink('/Battleground');
			});
		}
		else {
			prepare3v3APICall(myTankOne, myTankTwo, myTankThree, player, matchId => {
				console.log('Successfully prepared match with id: '+matchId);
				setMatchForBattleground(matchId);
				//TODO: select an appropriate arena depending on the match
				window.location.href=verifyLink('/Battleground');
			});
		}
	}

  divStyle = {
    color: "white",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
  }

  buttonDivStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  }

  style = {
    position: "relative",
    left: "50px"
  }


	onWagerUpdate = (): void => {
		const navbar = this.refs.navbar;
		navbar.reloadNavbar();
	}

	render(): React.Node {
		return (
		<div id="Parent" className='background-image'>
     		 <br/>
			<MainNavbar
				linkName="/Login"
				returnName="Logout"
				ref="navbar"
				pageName="Battle Arena"
				// linkName="/MainMenu"
				// youtubeLinks={["https://www.youtube.com/watch?v=9lGqrj6_X7Y"]}
 			/>
			<div className="column challenge">
				<div className="quickplay">
						<h5 style={this.divStyle}>Start a Match</h5>
						<ChallengePlayerPopup
							onChallengePlayer={(user) => this.onChallengePlayer(user)}
							playerChallenged={null}
							battleType={this.state.battleType}
						/>
				</div>
				<br/>
				<div className="search">
					<SearchPlayers
						onChallengePlayer={(user) => this.onChallengePlayer(user)}
						battleType={this.state.battleType}
					/>
				</div>
			</div>

			<div className="column battletype">
				<h5 style={this.divStyle}>Choose your Tank{this.state.battleType === '1 vs 1' ? '' : 's'}, Commander</h5>
				<br/>
				{(this.state.battleType === '1 vs 1') ?
					<div>
						<SelectTank
							selectedTank={this.state.selectedTankOne}
							allTanks={this.state.allTanks}
							changeSelectedTank={(tank) => this.setState({selectedTankOne: tank})}
							propogateChangesToCasus={true}
							allowRemoveTank={false}
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
											allowRemoveTank={true}
										/>
									</th>
									<th>
										<SelectTank
											selectedTank={this.state.selectedTankOne}
											allTanks={this.state.allTanks.filter(tank => tank !== this.state.selectedTankThree && tank !== this.state.selectedTankTwo)}
											changeSelectedTank={(tank) => this.setState({selectedTankOne: tank})}
											propogateChangesToCasus={false}
											allowRemoveTank={true}
										/>
									</th>
									<th>
										<SelectTank
											selectedTank={this.state.selectedTankThree}
											allTanks={this.state.allTanks.filter(tank => tank !== this.state.selectedTankOne && tank !== this.state.selectedTankTwo)}
											changeSelectedTank={(tank) => this.setState({selectedTankThree: tank})}
											propogateChangesToCasus={false}
											allowRemoveTank={true}
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
				<h5 style={this.divStyle}>Current Battle Type: {this.state.battleType}</h5>
				<button
					className="primarybtn"
					onClick={(this.state.battleType === '1 vs 1') ? () => this.setState({battleType: '3 vs 3'}) : () => this.setState({battleType: '1 vs 1'})}
          			style={this.buttonDivStyle}
				>
					Change Battle Type
				</button>
			</div>
			<div className='wager_info'>
				<h5 style={this.divStyle} text-align='center'>Wager a Tank</h5>
				<div className="wager">
					<SetWagerPopup
						ref="SetWagerPopup"
						onWagerUpdate={this.onWagerUpdate}
					/>
				</div>
			</div>
			<ToastContainer />
			<JoyRide
				steps={this.state.tour_steps}
				run={this.state.run}
				continuous={true}
				styles={{
					options: {
						zIndex: 1000,
						spotlightShadow: 'blue'
					}
				}}
			/>
		</div>
		);
	}
}

export default BattleArena;
