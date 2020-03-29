//@flow strict

import * as React from 'react';
import HealthBar from './HealthBar.js';
import Tank from '../tanks/Tank.js';

type Props = {|
	playerOneTank: ?Tank,
	playerTwoTank: ?Tank,
|};


class HealthBarsField extends React.Component<Props> {
	
	render(): React.Node {
		return (
			<div>
				<HealthBar 
					playersTank = {this.props.playerOneTank}
				/>
				<HealthBar 
					playersTank = {this.props.playerTwoTank}
				/>
			</div>
		);
	}
}

export default HealthBarsField;
