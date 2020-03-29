//@flow strict

import './TrainingArena.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';
import SelectTank from '../armory/SelectTank.js';
import Tank from '../tanks/Tank.js';
import { getAllUsersTanks } from '../globalComponents/tankAPIIntegration.js';
import TankDisplay from '../tanks/TankDisplay.js';
import getBotTanksAPICall from '../globalComponents/getBotTanksAPICall.js';

type TrainingTankInfo = {
	tankDisplayName: string,
	tankID: string,
}

type Props = {||};

type State = {|
	selectedTank: ?Tank,
	allTanks: Array<Tank>,
	enemySelectedTank: ?Tank,
	enemyTanks: Array<Tank>,
|};

class TrainingArena extends React.Component<Props, State> {

	constructor() {
		super();
		verifyLogin();
		this.state = {
			selectedTank: null,
			allTanks: [],
			enemySelectedTank: null,
			enemyTanks: [],
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
		getBotTanksAPICall(botTanks => this.setState({enemySelectedTank: botTanks[0], enemyTanks: botTanks}));
	}

	onClickStartBattle(): void {
		setReturnToFromBattlegroundLink('/TrainingArena');
		const trainingBotSelect: HTMLSelectElement=this.refs.trainingBotSelect;
		//const chosenBot=HARDCODED_TRAINING_TANKS.find(t => t.tankDisplayName === trainingBotSelect.value);
		//TODO: start battle between chosen bot.tankID and the bot that I select
		window.location.href=verifyLink('/Battleground');
	}

	render(): React.Node {
		return (
			<div id="Parent">
				<Navbar 
					linkName="/BattleArena" 
					returnName="Back to Battle Arena" 
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
			</div>
		)
	}
}

export default TrainingArena;
