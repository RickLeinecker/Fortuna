//@flow strict

import * as React from 'react';
import "../Main.css";
import Tank from '../tanks/Tank.js';

type Props = {
	playersTank: Tank,
}

type State = {
};

class HealthBar extends React.Component<Props, State> {

	componentDidUpdate(prevProps: Props) {
		if(prevProps.playersTank.health !== this.props.playersTank.health) {
			const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d");
			ctx.fillStyle="#FF0000";
			ctx.fillRect(10,140,(this.props.playersTank.health/100)*140,25);
		}
	}

	render(): React.Node {
		return (
			<div className = "inline">
				{this.props.playersTank.tankName}:
				<canvas
					className="healthBarCanvas inline"
					ref="canvas"
				/>
			</div>
		);
	}
}

export default HealthBar;
