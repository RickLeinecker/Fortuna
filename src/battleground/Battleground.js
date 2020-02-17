//@flow strict

import * as React from 'react';
import './Battleground.css';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';

let imagesLoaded=0;
const NUM_IMAGES=1;

//images to load
const dirtBackground=new Image();

class Battleground extends React.Component<{||}> {

	componentDidMount(): void {
		window.addEventListener('resize', () => this._rerender());
		dirtBackground.src='DirtBackground.png';
		dirtBackground.onload = ()=> {this._anotherImageLoaded();};

		this._rerender();
	}

	render(): React.Node {
		return (
			<div>
				<canvas
					className="battlegroundCanvas"
					ref="canvas"
				/>
			</div>
		);
	}

	_rerender(): void {
		if (imagesLoaded !== NUM_IMAGES) {
			return;
		}
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.drawImage(dirtBackground, 0, 0, getBattlegroundWidth(), getBattlegroundHeight());
	}

	_resizeCanvas() {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const targetWidth=canvas.clientWidth;
		const targetHeight=targetWidth*8/16;
		if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
			canvas.width = targetWidth;
			canvas.height = targetHeight;
		}
	}

	_anotherImageLoaded() {
		imagesLoaded++;
		if (imagesLoaded === NUM_IMAGES) {
			this._rerender();
		}
		if (imagesLoaded > NUM_IMAGES) {
			console.log('ERROR: NUM_IMAGES is only '+NUM_IMAGES+' but more than that were loaded!');
		}
	}

}

export default Battleground;
