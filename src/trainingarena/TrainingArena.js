//@flow strict

import './TrainingArena.css';
import * as React from 'react';
import Navbar from '../globalComponents/Navbar.js';
import { Link } from 'react-router-dom';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/verifyLogin.js';
import setReturnToFromBattlegroundLink from '../battleground/setReturnToFromBattlegroundLink.js';

type TrainingTankInfo = {
	tankDisplayName: string,
	tankID: string,
}

const HARDCODED_TRAINING_TANKS: Array<TrainingTankInfo> = [
	{
		tankDisplayName: 'Sitting Duck',
		tankID: '5e7e8e1659a651503e14d7d1',
	},
	{
		tankDisplayName: 'Roomba',
		tankID: '5e7e8ece59a651503e14d7d2',
	},
	{
		tankDisplayName: 'Rando Tank',
		tankID: '5e7e8f2959a651503e14d7d3',
	},
];

class TrainingArena extends React.Component<{||}> {

	constructor() {
		super();
		verifyLogin();
	}

	onClickStartBattle(): void {
		setReturnToFromBattlegroundLink('/TrainingArena');
		const trainingBotSelect: HTMLSelectElement=this.refs.trainingBotSelect;
		const chosenBot=HARDCODED_TRAINING_TANKS.find(t => t.tankDisplayName === trainingBotSelect.value);
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
					<select className="dropdownMenu">
						<option defaultValue>Select a Tank</option>
						<option value="1">Child Consumer</option>
						<option value="2">Fast Bang</option>
						<option value="3">Biggest Gun</option>
					</select>
					</div>
				<div className="column tamiddle">
					<h4>Choose an Arena to Battle</h4>
					<select className="dropdownMenu">
						<option defaultValue>Select Arena</option>
						<option value="1">Big Arena</option>
						<option value="2">Small Arena</option>
						<option value="3">Arena I am, yes</option>
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
					<select className="dropdownMenu" ref="trainingBotSelect">
						{HARDCODED_TRAINING_TANKS.map(trainingTankInfo =>
							<option key= {trainingTankInfo.tankID}>{trainingTankInfo.tankDisplayName}</option>
						)}
					</select>
				</div>
			</div>
		)
	}
}

export default TrainingArena;
