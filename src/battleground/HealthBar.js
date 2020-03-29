//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';

type Props = {
	playersTank: ?Tank,
}


class HealthBar extends React.Component<Props> {

	componentDidUpdate(prevProps: Props) {
		let currentHealth = this.props.playersTank?.health ?? 100;
		if(currentHealth < 0) {
			currentHealth = 0;
		}
		if(this.props !== prevProps) {
			const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle="#FF0000";
			ctx.fillRect(10,140,currentHealth,25);
		}
	}

	render(): React.Node {
		return (
			<div className = "inline">
				{this.props.playersTank?.tankName ?? ''}:
				<canvas
					className="healthBarCanvas inline"
					ref="canvas"
				/>
			</div>
		);
	}
}

export default HealthBar;
