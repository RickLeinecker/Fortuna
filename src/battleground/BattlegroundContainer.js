//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBarsField from './HealthBarsField.js';
import Navbar from '../globalComponents/Navbar.js';
import Tank from '../tanks/Tank.js';

type Props = {||};

type State = {
	playerOneTank?: Tank,
	playerTwoTank?: Tank,
};

class BattlegroundContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

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
					playerOneTank = {this.state?.playerOneTank ?? null}
					playerTwoTank = {this.state?.playerTwoTank ?? null}
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
