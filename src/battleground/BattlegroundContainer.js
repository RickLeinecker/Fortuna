//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBarsField from './HealthBarsField.js';
import Navbar from '../globalComponents/Navbar.js';
import Tank from '../tanks/Tank.js';
import BackendTank from '../tanks/BackendTank.js';
import { getTank, getEmptyCasusCode } from '../tanks/TankLoader.js';
import "../Main.css";

type Props = {||};

type State = {
	playerOneTank: Tank,
	playerTwoTank: Tank,
};

class BattlegroundContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		const blankTank: BackendTank = new BackendTank();
		blankTank._id = '';
		blankTank.components = [
			'empty', 'empty', 'empty',
			'empty', 'empty', 'empty',
			'empty', 'empty', 'empty',
			'empty', 'empty',
		];
		blankTank.casusCode = getEmptyCasusCode();
		blankTank.isBot = false;
		blankTank.tankName = '';

		this.state= {
			
			playerOneTank : getTank(blankTank),
			playerTwoTank : getTank(blankTank)
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
					playerOneTank = {this.state.playerOneTank}
					playerTwoTank = {this.state.playerTwoTank}
				/>
				<Battleground 
					setPlayerOneTank = {this.setPlayerOneTank}
					setPlayerTwoTank = {this.setPlayerTwoTank}
				/>
			</div>
		);
	}

	setPlayerOneTank = (playerOneTank: Tank): void  => {
		this.setState({
			playerOneTank: playerOneTank
		});
	}

	setPlayerTwoTank = (playerTwoTank: Tank): void  => {
		this.setState({
			playerTwoTank: playerTwoTank
		});
	}
}

export default BattlegroundContainer;
