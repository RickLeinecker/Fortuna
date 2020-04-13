//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { setWager, setWager3v3 } from '../globalComponents/apiCalls/userAPIIntegration.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall';
import { 
	setFavoriteTankId, 
	getFavoriteTank,
	removeFavoriteTankId, 
	removeFavoriteTankTeamIds,
	getFavoriteTankTeam, 
	setFavoriteTankTeamIds,
	getAllUsersTanks
} from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { ToastContainer , toast } from 'react-toastify';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType.js';
import { getEmptyCasusCode, getTank } from '../tanks/TankLoader.js';
import BackendTank from '../tanks/BackendTank.js';

type Props = {|
	onWagerUpdate: () => void
|};

type State = {|
	allTanks: Array<Tank>,
	userCurrency: number,
	userWager: number,
	userWager3v3: number,
	newWager: number,
	userWager3v3Tanks: Array<?Tank>,
	userWager1v1Tank: ?Tank,
	newWager3v3Tanks: Array<?Tank>,
	newWager1v1Tank: Tank,
	setWagerOpen: boolean,
	removeWagerOpen: boolean,
	battleType: BattleType
|};

class SetWagerPopup extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		// Create a blank tank as a placeholder until tanks are pulled.
		const blankTank: BackendTank = new BackendTank(
			'',
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',],
			getEmptyCasusCode(),
			false,
			'',
			''
		);

		this.state = {
			allTanks: [],
			userCurrency: 0,
			userWager: 0,
			userWager3v3: 0,
			newWager: 0,
			userWager3v3Tanks: [null, null, null],
			userWager1v1Tank: null,
			newWager3v3Tanks: [],
			newWager1v1Tank: getTank(blankTank),
			setWagerOpen: false,
			removeWagerOpen: false,
			battleType: '1 vs 1'
		}
	}

	// Once mounted, get the user's currency, wager, and favorite tank.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userCurrency: user.money, userWager: user.wager, userWager3v3: user.wager3v3});
		});

		getAllUsersTanks(tanks => {
			this.setState({allTanks: tanks, newWager1v1Tank: tanks[0]});
		});

		getFavoriteTank(tank => {
			this.setState({userWager1v1Tank: tank});
		});

		getFavoriteTankTeam(tanks => {
			this.setState({userWager3v3Tanks: tanks});
		});
	}

	// If the name of the wager tank is changed, update the currentWagerTank.
	updateWagerTankName(newName: string, tankIndex?: number): void {
		// If a tank index is passed, then you are updating the 3v3 tanks.
		if (tankIndex == null) {
			// Null check, however should not be able to rename a null tank.
			if (this.state.userWager1v1Tank == null) {
				return;
			}
			const newWagerTank: Tank = this.state.userWager1v1Tank;
			newWagerTank.tankName = newName;
			this.setState({userWager1v1Tank: newWagerTank});
		}
		else {
			const newWagerTanks: Array<?Tank> = this.state.userWager3v3Tanks;
			// Null check, however should not be able to rename a null tank.
			if (newWagerTanks[tankIndex] == null) {
				return;
			}
			newWagerTanks[tankIndex].tankName = newName;
			this.setState({userWager3v3Tanks: newWagerTanks});
		}
	}

	// Set the user's wager and favorite tank.
	handleWagerClick(): void {
		// Error handling.
		if (this.state.newWager > this.state.userCurrency) {
			toast.error('Not enough currency.');
			return;
		}

		// Set the new wager and favorite tank depending on the battleType.
		if (this.state.battleType === '1 vs 1') {
			setWager(this.state.newWager, stipendApplied => {
				if (this.state.newWager1v1Tank._id === '') {
					toast.error('Tank not loaded yet, select it again.');
				}
				if (stipendApplied) {
					toast.success('$100 added for setting your daily wager!');
				}
				this.setState({userWager: this.state.newWager});
				// Update user currency in the navbar.
				this.props.onWagerUpdate();
			});
			setFavoriteTankId(this.state.newWager1v1Tank._id, () => {
				this.setState({setWagerOpen: false, userWager1v1Tank: this.state.newWager1v1Tank});
			});
		}
		else {
			if (this.state.newWager3v3Tanks[0] == null && this.state.newWager3v3Tanks[1] == null && this.state.newWager3v3Tanks[2] == null) {
				toast.error('No set 3v3 tanks!');
				return;
			}
			setWager3v3(this.state.newWager, stipendApplied => {
				if (stipendApplied) {
					toast.success('$100 added for setting your daily wager!');
				}
				this.setState({userWager3v3: this.state.newWager});
				// Update user currency in the navbar.
				this.props.onWagerUpdate();
			});
			setFavoriteTankTeamIds(this.state.newWager3v3Tanks.map(tank => tank == null ? null : tank._id), () => {
				this.setState({setWagerOpen: false, userWager3v3Tanks: this.state.newWager3v3Tanks});
			});
		}
		
	}

	// Remove the user's wager and favorite tank.
	handleRemoveClick(): void {
		if (this.state.battleType === '1 vs 1') {
			removeFavoriteTankId(() => {
				this.setState({removeWagerOpen: false, userWager1v1Tank: null, userWager: 0});
				this.props.onWagerUpdate();
			});
		}
		else {
			removeFavoriteTankTeamIds(() => {
				this.setState({removeWagerOpen: false, userWager3v3Tanks: [], userWager3v3: 0});
				this.props.onWagerUpdate();
			});
		}
	}

	// Updates newWager3v3Tanks when changing a tank.
	update3v3Tanks(newTankName: string, tankIndex: number): void {
		const newTank: Tank = this.state.allTanks[this.state.allTanks.findIndex(tank => tank.tankName === newTankName)];
		let newWager3v3Tanks: Array<?Tank> = this.state.newWager3v3Tanks;
		newWager3v3Tanks[tankIndex] = newTank;
		this.setState({newWager3v3Tanks: newWager3v3Tanks});
	}

	render(): React.Node {
		const wagerButton = (
			<button className="popupbtn" onClick={() => this.handleWagerClick()}>
				Wager
			</button>
		);
		const removeButton = (
			<button 
				className="popupbtn" 
				onClick={() => this.handleRemoveClick()}
				disabled={
					((this.state.battleType === '1 vs 1' && (this.state.userWager1v1Tank == null || this.state.userWager === 0)) || 
					(this.state.battleType === '3 vs 3' && (( 
						this.state.userWager3v3Tanks[0] == null && 
						this.state.userWager3v3Tanks[1] == null && 
						this.state.userWager3v3Tanks[2] == null) ||
						this.state.userWager3v3 === 0)))
				}
			>
				Remove
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({setWagerOpen: false, removeWagerOpen: false, newWager3v3Tanks: [null, null, null]})}>
				Cancel
			</button>
		);

		return (
			<div>
				<h5>Wager a Tank</h5>
				<div className="row rowPadding">
					<button className="smallbtn" onClick={() => this.setState({setWagerOpen: true})}>
						Setup
					</button>
					&emsp;
					<button 
						disabled={
							((this.state.userWager1v1Tank == null  || this.state.userWager === 0)&& 
							(this.state.userWager3v3Tanks === [null, null, null] || this.state.userWager3v3===0 ))
						}
						className="smallbtn"
						onClick={() => this.setState({removeWagerOpen: true})}
					>
						Remove
					</button>
				</div>
				<br/>
				<h6>Current 1v1 Wager:</h6>
				<label>{this.state.userWager1v1Tank == null || this.state.userWager===0 ?
					<div>No set 1v1 wager tank<br/><br/></div> : 
					<label>
						<div className="wagerTank">{this.state.userWager1v1Tank.tankName}</div> for {this.state.userWager}
					</label>
				}</label>
				<br/>
				<h6>Current 3v3 Wager:</h6>
				<label>{(this.state.userWager3v3Tanks[0] == null && this.state.userWager3v3Tanks[1] == null && this.state.userWager3v3Tanks[2] == null) || this.state.userWager3v3===0?
					'No set 3v3 wager tanks' : 
					<label>
						{this.state.userWager3v3Tanks[0] == null ? <div>No Tank</div> : <div className="wagerTank">{this.state.userWager3v3Tanks[0].tankName}</div>}
						{this.state.userWager3v3Tanks[1] == null ? <div>No Tank</div> : <div className="wagerTank">{this.state.userWager3v3Tanks[1].tankName}</div>}
						{this.state.userWager3v3Tanks[2] == null ? <div>No Tank</div> : <div className="wagerTank">{this.state.userWager3v3Tanks[2].tankName}</div>}
						for {this.state.userWager3v3}
					</label>
				}</label>
				<div className="wagerPopup">
					<Popup 
						open={this.state.setWagerOpen}
						onClose={() => this.setState({setWagerOpen: false, newWager3v3Tanks: [null, null, null]})}
					>
						<div className="popup">
							<br/>
							<h5>Select Wager's Battle Type</h5>
							<div className="row center">
								<button 
									onClick={() => this.setState({battleType: '1 vs 1'})}
									className="smallbtn"
								>
									1 vs 1
								</button>&emsp;
								<button 
									onClick={() => this.setState({battleType: '3 vs 3'})}
									className="smallbtn"
								>
									3 vs 3
								</button>
							</div>
							<br/>
							<h5>Select Tank{this.state.battleType === '1 vs 1' ? '' : 's'}</h5>
							{this.state.battleType === '1 vs 1' ?
								<div>
									<select 
										className="dropdownMenu"
										onChange={(e) => this.setState({newWager1v1Tank: this.state.allTanks[this.state.allTanks.findIndex(tank => tank.tankName === e.target.value)]})}
									>
										{this.state.allTanks.map(tank => tank.tankName).map((tankName, index) => 
											<option key={index}>
												{tankName}
											</option>
										)}
									</select>
								</div> : 
								<div>
									<select 
										className="dropdownMenu"
										onChange={(e) => this.update3v3Tanks(e.target.value, 0)}
									>
										<option value={null}>No Tank</option>
										{this.state.allTanks
											.filter(tank => tank !== this.state.newWager3v3Tanks[1] && tank !== this.state.newWager3v3Tanks[2])
											.map(tank => tank.tankName)
											.map((tankName, index) => 
												<option key={index}>
													{tankName}
												</option>
											)
										}
									</select>
									<br/>
									<select 
										className="dropdownMenu"
										onChange={(e) => this.update3v3Tanks(e.target.value, 1)}
									>
										<option value={null}>No Tank</option>
										{this.state.allTanks
											.filter(tank => tank !== this.state.newWager3v3Tanks[0] && tank !== this.state.newWager3v3Tanks[2])
											.map(tank => tank.tankName)
											.map((tankName, index) => 
												<option key={index}>
													{tankName}
												</option>
											)
										}
									</select>
									<br/>
									<select 
										className="dropdownMenu"
										onChange={(e) => this.update3v3Tanks(e.target.value, 2)}
									>
										<option value={null}>No Tank</option>
										{this.state.allTanks
											.filter(tank => tank !== this.state.newWager3v3Tanks[0] && tank !== this.state.newWager3v3Tanks[1])
											.map(tank => tank.tankName)
											.map((tankName, index) => 
												<option key={index}>
													{tankName}
												</option>
											)
										}
									</select>
								</div>
							}
							<br/>
							<h6>Input amount to wager your tank{this.state.battleType === '1 vs 1' ? ' for' : 's for'}</h6>
							<input 
								type="number" 
								className="inputText"
								onChange={e => this.setState({ newWager: e.target.value})} 
							/>
							{wagerButton}{cancelButton}
						</div>
					</Popup>
				</div>
				<div className="deletePopup">
					<Popup 
						open={this.state.removeWagerOpen}
						onClose={() => this.setState({removeWagerOpen: false})}
					>
						<div className="popup">
							<br/>
							<h5>Select Wager's Battle Type</h5>
							<div className="row center">
								<button 
									onClick={() => this.setState({battleType: '1 vs 1'})}
									className="smallbtn"
								>
									1 vs 1
								</button>&emsp;
								<button 
									onClick={() => this.setState({battleType: '3 vs 3'})}
									className="smallbtn"
								>
									3 vs 3
								</button>
							</div>
							<br/>
							{this.state.battleType === '1 vs 1' ?
								<div>
									<h5>{(this.state.userWager1v1Tank == null || this.state.userWager === 0) ? 
										'No set 1v1 Wager Tank' : 
										<div>Remove <div className="wagerTank">{this.state.userWager1v1Tank.tankName}</div> from being wagered?</div>
									}</h5>
								</div> :
								<div>
									{(this.state.userWager3v3Tanks[0] == null && this.state.userWager3v3Tanks[1] == null && this.state.userWager3v3Tanks[2] == null) || this.state.userWager3v3===0 ?
										<h5>No 3v3 tanks wagered</h5> :
										<h5>
											Remove 
											{this.state.userWager3v3Tanks[0] == null ? <div>No tank</div> : <div className="wagerTank">{this.state.userWager3v3Tanks[0].tankName}</div>}
											{this.state.userWager3v3Tanks[1] == null ? <div>No tank</div> : <div className="wagerTank">{this.state.userWager3v3Tanks[1].tankName}</div>}
											{this.state.userWager3v3Tanks[2] == null ? <div>No tank</div> : <div className="wagerTank">{this.state.userWager3v3Tanks[2].tankName}</div>}
											<div>from being wagered?</div>
										</h5>
									}
								</div>
							}
							{removeButton}{cancelButton}
						</div>
					</Popup>
				</div>
				<ToastContainer />
			</div>
		);
	}
}

export default SetWagerPopup;
