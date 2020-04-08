//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';
import './HealthBar.css'
import {getImage} from './ImageLoader.js';

type Props = {|
	timeLeftText: string,
	fadeInAlpha: number,
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

			this.draw1V1Healthbars(ctx);

			//draw black intro curtain
			const oldAlpha=ctx.globalAlpha;
			ctx.globalAlpha=this.props.fadeInAlpha;
			ctx.fillStyle='black';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.globalAlpha=oldAlpha;
		}
	}

	draw1V1Healthbars(ctx: CanvasRenderingContext2D): void {
		// draw tank names
		const oldFont=ctx.font;
		const LIGHT_BLUE='#04CCFF';
		ctx.font='normal small-caps 30px arial';

		let text=this.props.tank1?.tankName??'';
		ctx.fillStyle='black';
		let width=ctx.measureText(text).width;
		ctx.fillText(text, WIDTH/80+2, HEIGHT*.4+2);
		ctx.fillStyle=LIGHT_BLUE;
		ctx.fillText(text, WIDTH/80, HEIGHT*.4);

		text=this.props.tank2?.tankName??'';
		ctx.fillStyle='black';
		width=ctx.measureText(text).width;
		ctx.fillText(text, WIDTH-WIDTH/80-width+2, HEIGHT*.4+2);
		ctx.fillStyle=LIGHT_BLUE;
		ctx.fillText(text, WIDTH-WIDTH/80-width, HEIGHT*.4);

		ctx.font=oldFont;
		// end draw tank names

		// draw actual health bars
		ctx.fillStyle='#030915';
		const BAR_WIDTH=WIDTH/3;
		ctx.fillRect(WIDTH/80, HEIGHT*.55, BAR_WIDTH, HEIGHT*.3);
		ctx.fillRect(WIDTH-WIDTH/80-BAR_WIDTH, HEIGHT*.55, BAR_WIDTH, HEIGHT*.3);
		ctx.fillStyle=LIGHT_BLUE;
		const percent1=Math.max(0, this.props.tank1.getHealth()/this.props.tank1._getArmorOffset());
		const percent2=Math.max(0, this.props.tank2.getHealth()/this.props.tank2._getArmorOffset());
		const BORDER=4;
		const SMALL_WIDTH=BAR_WIDTH-2*BORDER;
		const SMALL_HEIGHT=HEIGHT*.3-2*BORDER;
		ctx.fillRect(WIDTH/80+BORDER, HEIGHT*.55+BORDER, SMALL_WIDTH*percent1, SMALL_HEIGHT);
		const SMALL_WIDTH2=SMALL_WIDTH*percent2;
		ctx.fillRect(WIDTH-WIDTH/80-BORDER-SMALL_WIDTH2, HEIGHT*.55+BORDER, SMALL_WIDTH2, SMALL_HEIGHT);
		// end draw actual health bars
		
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
