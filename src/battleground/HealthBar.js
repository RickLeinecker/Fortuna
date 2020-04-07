//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';
import './HealthBar.css'
import {getImage} from './ImageLoader.js';

type Props = {|
	timeLeftText: string,
	tank1: ?Tank,
	tank2: ?Tank,
|}

const WIDTH=1300;
const HEIGHT=100;

class HealthBar extends React.Component<Props> {

	componentDidUpdate(prevProps: Props) {
		if(this.props !== prevProps) {
			const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d");

			//draw background
			ctx.fillStyle='black';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.drawImage(getImage('HEALTHBAR_BACKGROUND'), 0, 0);

			//draw time text
			const oldFont=ctx.font;
			const text=this.props.timeLeftText;
			ctx.fillStyle='black';
			ctx.font='normal small-caps 80px arial';
			const width=ctx.measureText(text).width;
			ctx.fillText(text, WIDTH/2-width/2+4, HEIGHT*.8+4);
			ctx.fillStyle='#ddddee';
			ctx.fillText(text, WIDTH/2-width/2, HEIGHT*.8);
			ctx.font=oldFont;


			
		}
	}

	render(): React.Node {
		return (
			<div className = "inline">
				<canvas
					className="healthBarCanvas inline"
					ref="canvas"
					width={WIDTH}
					height={HEIGHT}
				/>
			</div>
		);
	}
}

export default HealthBar;
