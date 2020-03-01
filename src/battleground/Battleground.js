//@flow strict

import * as React from 'react';
import './Battleground.css';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import {imageLoaderInit, getImage, addCallbackWhenImageLoaded} from './ImageLoader.js';
import ImageDrawer from './ImageDrawer.js';
import Tank from '../tanks/Tank.js';
import Wall from './Wall.js';
import Vec from '../casus/blocks/Vec.js';
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
		const testWall1: Wall = new Wall(new Vec(10, 0), Math.PI/2);
		const testWall2: Wall = new Wall(new Vec(60, 0), 0);
		const testWall3: Wall = new Wall(new Vec(-50, 30), Math.PI/5);
		const testWall4: Wall = new Wall(new Vec(-50, -30), -Math.PI/5);

		testTank.drawSelf(drawer);
		testWall1.drawSelf(drawer);
		testWall2.drawSelf(drawer);
		testWall3.drawSelf(drawer);
		testWall4.drawSelf(drawer);
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
