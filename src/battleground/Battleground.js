//@flow strict

import * as React from 'react';
import './Battleground.css';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import {imageLoaderInit, getImage, addCallbackWhenImageLoaded} from './ImageLoader.js';
import ImageDrawer from './ImageDrawer.js';
import Tank from '../tanks/Tank.js';
import {getTestTank} from '../tanks/TankLoader.js';

class Battleground extends React.Component<{||}> {

	constructor() {
		super();
		window.addEventListener('resize', () => this._rerender());
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());
	}

	componentDidMount(): void {
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
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.drawImage(getImage('DIRT_BACKGROUND'), 0, 0, getBattlegroundWidth(), getBattlegroundHeight());
		const drawer=new ImageDrawer(ctx);

		const testTank: Tank = getTestTank();
		testTank.drawSelf(drawer);
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

}

export default Battleground;
