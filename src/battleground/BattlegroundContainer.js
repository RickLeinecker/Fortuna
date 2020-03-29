//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBarsField from './HealthBarsField.js';
import Navbar from '../globalComponents/Navbar.js';
import Tank from '../tanks/Tank.js';

type Props = {||};

type State = {
	playerOneTank: ?Tank,
	playerTwoTank: ?Tank,
};

class BattlegroundContainer extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			playerOneTank: null,
			playerTwoTank : null,
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
				<div className = "battleground">
					<HealthBarsField
						playerOneTank = {this.state.playerOneTank}
						playerTwoTank = {this.state.playerTwoTank}
					/>
					<Battleground 
						setPlayersTank = {this.setPlayersTank}
					/>
				</div>
			</div>
		);
	}

	setPlayersTank = (playerOneTank: Tank, playerTwoTank: Tank): void  => {
		this.setState({
			playerOneTank: playerOneTank,
			playerTwoTank: playerTwoTank
		});
	}
}

export default BattlegroundContainer;
