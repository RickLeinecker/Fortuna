//@flow strict

import * as React from 'react';
import "../Main.css";
import HealthBar from './HealthBar.js';

type Props = {|
	playerOneTankName: string,
	playerOneHealth: number,
	playerTwoTankName: string,
	playerTwoHealth: number
|};

type State = {
};

class HealthBarsField extends React.Component<Props, State> {
	
	render(): React.Node {
		return (
			<div>
				<HealthBar 
					playersTankName = {this.props.playerOneTankName}
					playersHealth = {this.props.playerOneHealth}
				/>
				<HealthBar 
					playersTankName = {this.props.playerTwoTankName}
					playersHealth = {this.props.playerTwoHealth}
				/>
			</div>
		);
	}
}

export default HealthBarsField;
