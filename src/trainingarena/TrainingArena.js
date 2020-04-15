//@flow strict

import './TrainingArena.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';
import SelectTank from '../globalComponents/SelectTank.js';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import TankDisplay from '../tanks/TankDisplay.js';
import getBotTanksAPICall from '../globalComponents/apiCalls/getBotTanksAPICall.js';
import setTanksToFightInBattleground from '../battleground/setTanksToFightInBattleground.js';
import {setTanksToFightInBattleground3v3} from '../battleground/setTanksToFightInBattleground.js';
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import getPreferredSelectedTank from '../globalComponents/getPreferredSelectedTank.js';
import getPreferredArena from '../globalComponents/getPreferredArena.js';
import setPreferredArena from '../globalComponents/setPreferredArena.js';
import { toast, ToastContainer } from 'react-toastify';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType';
import getPreferredBattleType from './getPreferredBattleType.js';
import setPreferredBattleType from './setPreferredBattleType.js';

type Props = {||};

type State = {|
	selectedTankOne: ?Tank,
	selectedTankTwo: ?Tank,
	selectedTankThree: ?Tank,
	allTanks: Array<Tank>,
	botTankOne: ?Tank,
	botTankTwo: ?Tank,
	botTankThree: ?Tank,
	botTanks: Array<Tank>,
	battleType: BattleType
|};

class TrainingArena extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		this.state = {
			selectedTankOne: null,
			selectedTankTwo: null,
			selectedTankThree: null,
			allTanks: [],
			botTankOne: null,
			botTankTwo: null,
			botTankThree: null,
			botTanks: [],
			battleType: getPreferredBattleType(),
		};
	}

	componentDidMount(): void {
		getAllUsersTanks(allTanks => {
			this.setState({
				allTanks: allTanks,
				selectedTankOne: getPreferredSelectedTank(allTanks)
			});
		});
		getBotTanksAPICall(botTanks => this.setState({botTankOne: botTanks[0], botTanks: botTanks}));
	}

	onClickStartBattle(): void {
		const myTankOne: ?Tank = this.state.selectedTankOne;
		const myTankTwo: ?Tank = this.state.selectedTankTwo;
		const myTankThree: ?Tank = this.state.selectedTankThree;
		const botTankOne: ?Tank = this.state.botTankOne;
		const botTankTwo: ?Tank = this.state.botTankTwo;
		const botTankThree: ?Tank = this.state.botTankThree;
		const arenaSelector: HTMLSelectElement=this.refs.arenaSelect;
		if (myTankOne == null && myTankTwo == null && myTankThree == null) {
			toast.error('One of your tanks must be selected!');
			return;
		}
		if (botTankOne == null && botTankTwo == null && botTankThree == null) {
			toast.error('One bot tank must be selected!');
			return;
		}
		const selected = arenaSelector.value;
		if (selected === 'DIRT' || selected === 'HEX' || selected === 'CANDEN' || selected === 'LUNAR') {
			setBattlegroundArena(selected);
		}

		setReturnToFromBattlegroundLink('/TrainingArena');
		// NEED TO UPDATE SET 3v3 TANKS TO FIGHT IN BATTLEGROUND
		if (this.state.battleType === '1 vs 1') {
			if (myTankOne == null || botTankOne == null) {
				toast.error('One bot tank and one of your tanks must be selected!');
				return;
			}
			setTanksToFightInBattleground(myTankOne._id, botTankOne._id);
		}
		else {
			setTanksToFightInBattleground3v3(myTankOne, myTankTwo, myTankThree, botTankOne, botTankTwo, botTankThree);
		}

		window.location.href=verifyLink('/Battleground');
	}

	onChangeBattleTypeClicked(): void {
		const newBattleType = this.state.battleType === '1 vs 1'?'3 vs 3':'1 vs 1';
		setPreferredBattleType(newBattleType);
		this.setState({battleType: newBattleType});
	}
	
	onChange(): void {
		const arenaSelector: HTMLSelectElement=this.refs.arenaSelect;
		const selected = arenaSelector.value;
		if (selected === 'DIRT' || selected === 'HEX' || selected === 'CANDEN' || selected === 'LUNAR') {
			setPreferredArena(selected);
		}
	}

	render(): React.Node {
		const preferredArena=getPreferredArena(this.state.battleType);
		return (
			<div id="Parent">
				<Navbar 
					linkName="/MainMenu" 
					returnName="Back to Main Menu" 
					pageName="Training Arena" 
					youtubeLinks={["https://www.youtube.com/watch?v=7Tm4GYbsGYw"]}
				/>
				<div className="column taleft">
					<h5>Choose your Tank, Commander</h5>
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
				</div>
				<div className="column tamiddle">
					<h5>Current Battle Type: {this.state.battleType}</h5>
					<button 
						className="primarybtn" 
						onClick={() => this.onChangeBattleTypeClicked()}
					>
						Change Battle Type
					</button>
					<br/><br/><br/>
					<h5>Arena</h5>
					{ this.state.battleType === '1 vs 1' ? 
						<select 
							className="dropdownMenu" 
							ref="arenaSelect" 
							defaultValue={preferredArena} 
							onChange={() => this.onChange()}
						>
							<option value="DIRT">Classic</option>
							<option value="HEX">Hex</option>
						</select>
					:
						<select 
							className="dropdownMenu" 
							ref="arenaSelect" 
							defaultValue={preferredArena} 
							onChange={() => this.onChange()}
						>
							<option value="CANDEN">Canden</option>
							<option value="LUNAR">Lunar</option>
						</select>

					}
					<br/><br/><br/>
					<button 
						type="button" 
						className="primarybtn" 
						onClick={() => this.onClickStartBattle()}
					>
						Start Battle
					</button>
					<br/><br/>
					<Link to={verifyLink("/Casus")}>
						<button className="smallbtn">Casus</button>
					</Link>
				</div>
				<div className="column taright">
					<h5>Choose a Training Bot</h5>
					<br/>
					{(this.state.battleType === '1 vs 1') ?
						<div>
							<SelectTank
								selectedTank={this.state.botTankOne}
								allTanks={this.state.botTanks}
								changeSelectedTank={(tank) => this.setState({botTankOne: tank})}
								propogateChangesToCasus={false}
							/>
							{this.state.botTankOne == null ? <div className="emptyTankBig"></div> : <TankDisplay tankToDisplay={this.state.botTankOne} smallTank={false} />}
						</div> :
						<div className="threeTankDisplay">
							<table>
								<thead>
									<tr>
										<th>
											<SelectTank
												selectedTank={this.state.botTankTwo}
												allTanks={this.state.botTanks}
												changeSelectedTank={(tank) => this.setState({botTankTwo: tank})}
												propogateChangesToCasus={false}
											/>
										</th>
										<th>
											<SelectTank
												selectedTank={this.state.botTankOne}
												allTanks={this.state.botTanks}
												changeSelectedTank={(tank) => this.setState({botTankOne: tank})}
												propogateChangesToCasus={false}
											/>
										</th>
										<th>
											<SelectTank
												selectedTank={this.state.botTankThree}
												allTanks={this.state.botTanks}
												changeSelectedTank={(tank) => this.setState({botTankThree: tank})}
												propogateChangesToCasus={false}
											/>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											{this.state.botTankTwo == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={this.state.botTankTwo} smallTank={true} />}
											
										</td>
										<td>
											{this.state.botTankOne == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={this.state.botTankOne} smallTank={true} />}
										</td>
										<td>
											{this.state.botTankThree == null ? <div className="emptyTankSmall"></div> : <TankDisplay tankToDisplay={this.state.botTankThree} smallTank={true} />}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					}
				</div>
				<ToastContainer />
			</div>
		)
	}
}

export default TrainingArena;
