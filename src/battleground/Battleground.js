//@flow strict

import * as React from 'react';
import './Battleground.css';

const dirtBackground=new Image();

let imagesLoaded=0;
const numImages=1;
const width=1600;
const height=900;

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
		if (imagesLoaded !== numImages) {
			return;
		}
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.drawImage(dirtBackground, 0, 0, width, height);
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
		if (imagesLoaded === numImages) {
			this._rerender();
		}
	}

}

export default Battleground;
