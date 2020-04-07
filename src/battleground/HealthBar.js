//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';
import './HealthBar.css'
import {getImage} from './ImageLoader.js';

type Props = {
	tank1: ?Tank,
	tank2: ?Tank,
}


class HealthBar extends React.Component<Props> {

	componentDidUpdate(prevProps: Props) {
		if(this.props !== prevProps) {
			const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d");
			ctx.fillStyle='black';
			ctx.fillRect(0, 0, 10000, 10000);
			ctx.drawImage(getImage('HEALTHBAR_BACKGROUND'), 0, 0);
		}
	}

	render(): React.Node {
		return (
			<div className = "inline">
				<canvas
					className="healthBarCanvas inline"
					ref="canvas"
					width={1300}
					height={100}
				/>
			</div>
		);
	}
}

export default HealthBar;
