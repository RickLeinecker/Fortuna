//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBarsField from './HealthBarsField.js';
import Navbar from '../globalComponents/Navbar.js';
import "../Main.css";

type Props = {||};

type State = {
	playerOneTankName: string,
	playerOneHealth: number,
	playerTwoTankName: string,
	playerTwoHealth: number
};

class BattleGroundContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state= {
			playerOneTankName: '',
			playerOneHealth: 0,
			playerTwoTankName: '',
			playerTwoHealth: 0,
		}
	}

	render(): React.Node {
		return (
			<div className="haveScorebarIfSmall">
				<Navbar
					linkName='/BattleArena'
					returnName='Back to Battle Arena'
					pageName='Battleground'
				/>
				<HealthBarsField
					playerOneTankName = {this.state.playerOneTankName}
					playerOneHealth = {this.state.playerOneHealth}
					playerTwoTankName = {this.state.playerTwoTankName}
					playerTwoHealth = {this.state.playerTwoHealth}
				/>
				<Battleground 
					setPlayerOneTankName = {this.setPlayerOneTankName}
					setPlayerOneHealth = {this.setPlayerOneHealth}
					setPlayerTwoTankName = {this.setPlayerTwoTankName}
					setPlayerTwoHealth = {this.setPlayerTwoHealth}
				/>
			</div>
		);
	}

	setPlayerOneTankName = (playerOneTankName: string): void  => {
		this.setState({
			playerOneTankName: playerOneTankName
		});
	}

	setPlayerOneHealth = (playerOneHealth: number): void  => {
		this.setState({
			playerOneHealth: playerOneHealth
		});
	}

	setPlayerTwoTankName = (playerTwoTankName: string): void  => {
		this.setState({
			playerTwoTankName: playerTwoTankName
		});
	}

	setPlayerTwoHealth = (playerTwoHealth: number): void  => {
		this.setState({
			playerTwoHealth: playerTwoHealth
		});
	}
}

export default BattleGroundContainer;
