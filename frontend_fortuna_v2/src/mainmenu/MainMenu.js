//@flow strict

import './MainMenu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import Replays from "../battlearena/Replays";
import Leaderboard from "../globalComponents/Leaderboard";
import SelectTank from "../globalComponents/SelectTank";
import TankDisplay from "../tanks/TankDisplay";
import {getAllUsersTanks} from "../globalComponents/apiCalls/tankAPIIntegration";
import getPreferredSelectedTank from "../globalComponents/getPreferredSelectedTank";
import getReplayListAPICall from "../globalComponents/apiCalls/getReplayListAPICall";
import Tank from "../tanks/Tank";
import type {BattleType} from "../globalComponents/typesAndClasses/BattleType";

type Props = {||};

type State = {|
	selectedTankOne: ?Tank,
	selectedTankTwo: ?Tank,
	selectedTankThree: ?Tank,
	allTanks: Array<Tank>,
	userElo: number,
	battleType: BattleType
|};

// Main Menu component.
class MainMenu extends React.Component<Props, State> {

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

    document.body.style.backgroundImage = "url('/login_background.gif')"
    document.body.style.fontFamily = "font-family: 'Press Start 2P', cursive;"
	  getAllUsersTanks(allTanks => {
		  this.setState({
			  allTanks: allTanks,
			  selectedTankOne: getPreferredSelectedTank(allTanks)
		  });
	  });
	  getReplayListAPICall(() => {});
  }

	render(): React.Node {
		return (
			<div id="Parent">
				<MainNavbar
					linkName="/Login"
					returnName="Logout"
					pageName="Main Menu"
				/>
				<h1 className="menuheader">Where to Commander?</h1>
				<div className="column menuleft">
					<Replays />
					<br/>
					<Link to={verifyLink("/TrainingArena")}>
						<button className="mainMenuBtn">Training</button>
					</Link>
				</div>
				<div className="column menumiddle">
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
					<br/>
					<Link to={verifyLink("/Casus")}>
						<button className="mainMenuBtn">Edit Tank Code</button>
					</Link>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<Link to={verifyLink("/BattleArena")}>
						<button className="mainMenuBtn">Play</button>
					</Link>
				</div>
				<div className="column menuright">
					<Leaderboard/>
					<br/>
					<Link to={verifyLink("/Credits")}>
						<button className="mainMenuBtn">Credits</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default MainMenu;
