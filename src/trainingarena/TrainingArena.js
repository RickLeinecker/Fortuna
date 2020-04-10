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
import setBattlegroundArena from '../battleground/setBattlegroundArena.js';
import { toast, ToastContainer } from 'react-toastify';
import type { BattleType } from '../globalComponents/typesAndClasses/BattleType';

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
			battleType: '1 vs 1'
		};
	}

	componentDidMount(): void {
		getAllUsersTanks(allTanks => {
				this.setState({
					allTanks: allTanks,
					selectedTankOne: allTanks[0]
			});
		});
		getBotTanksAPICall(botTanks => this.setState({botTankOne: botTanks[0], botTanks: botTanks}));
	}

	onClickStartBattle(): void {
		const myTankOne: Tank = this.state.selectedTankOne;
		const myTankTwo: Tank = this.state.selectedTankTwo;
		const myTankThree: Tank = this.state.selectedTankThree;
		const botTankOne: Tank = this.state.botTankOne;
		const botTankTwo: Tank = this.state.botTankTwo;
		const botTankThree: Tank = this.state.botTankThree;
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

		if (this.state.battleType === '1 vs 1') {
			setTanksToFightInBattleground(myTankOne._id, botTankOne._id);
		}
		else {

		}

		window.location.href=verifyLink('/Battleground');
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="/MainMenu" 
					returnName="Back to Main Menu" 
					pageName="Training Arena" 
				/>
				<div className="column taleft">
					<h5>Choose your Tank, Commander</h5>
					{
						this.state.selectedTank==null?<div></div>:
						<TankDisplay tankToDisplay={this.state.selectedTank} />
					}
					<SelectTank
						selectedTank={this.state.selectedTank}
						allTanks={this.state.allTanks}
						changeSelectedTank={(tank) => {
							this.setState({selectedTank: tank});
						}}
					/>
				</div>
				<div className="column tamiddle">
					<h5>Arena</h5>
					<select className="dropdownMenu" ref="arenaSelect">
						<option value="DIRT">Classic</option>
						<option value="HEX">Hex</option>
						<option value="CANDEN">Canden</option>
						<option value="LUNAR">Lunar</option>
					</select>
					<button 
						type="button" 
						className="primarybtn" 
						onClick={() => this.onClickStartBattle()}
					>
						Start Battle
					</button>
					<br/>
					<Link to={verifyLink("/Casus")}>
						<button className="clearbtn">Back to Casus</button>
					</Link>
				</div>
				<div className="column taright">
					<h5>Choose a Training Bot</h5>
					{
						this.state.enemySelectedTank==null?<div></div>:
						<TankDisplay tankToDisplay={this.state.enemySelectedTank} />
					}
					<SelectTank
						selectedTank={this.state.enemySelectedTank}
						allTanks={this.state.enemyTanks}
						changeSelectedTank={(tank) => {
							this.setState({enemySelectedTank: tank});
						}}
					/>
				</div>
				<ToastContainer />
			</div>
		)
	}
}

export default TrainingArena;
