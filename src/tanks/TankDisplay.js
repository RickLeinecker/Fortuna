//@flow strict

import * as React from 'react';
import Tank from './Tank.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import { imageLoaderInit, addCallbackWhenImageLoaded } from '../battleground/ImageLoader.js';
import './TankDisplay.css';

type Props = {|
	tankToDisplay: Tank
|};

const FPS=20;
const MIN_NEW_GUN_ANGLE_TIME=30*1, MAX_NEW_GUN_ANGLE_TIME=30*7;
const LERP_SPEED_MIN=0.02, LERP_SPEED_MAX=0.1;

class TankDisplay extends React.Component<Props> {
	alive: boolean;
	mainGunAngle: number;
	targetGunAngle: number;
	moveGunCounter: number;
	lerpSpeed: number;

	constructor(props: Props) {
		super();
		window.addEventListener('resize', this.onResize);
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());
		this.mainGunAngle=0;
		this.targetGunAngle=0;
		this.moveGunCounter=0;
		this.lerpSpeed=LERP_SPEED_MIN;
	}

	componentDidUpdate(): void {
		this._rerender();
	}

	onResize = () => this._rerender();

	componentDidMount(): void {
		this._rerender();
		this.alive=true;
		setTimeout(() => this._gameLoop(), 1000/20);
	}

	componentWillUnmount() {
		this.alive=false;
		window.removeEventListener('resize', this.onResize);
	}

	render(): React.Node {
		return (
			<div>
				<canvas
					className="tankDisplayCanvas"
					ref="canvas"
					width="400px"
					height="400px"
				/>
			</div>
		);
	}

	_gameLoop(): void {
		if (!this.alive) {
			//stop updating
			return;
		}
		this._update();
		this._rerender();
		setTimeout(() => this._gameLoop(), 1000/FPS);
	}

	_update(): void {
		this.moveGunCounter--;
		if (this.moveGunCounter<=0) {
			this.moveGunCounter=MIN_NEW_GUN_ANGLE_TIME+Math.random()*(MAX_NEW_GUN_ANGLE_TIME-MIN_NEW_GUN_ANGLE_TIME);
			this.targetGunAngle=Math.random()*6.28;
			this.lerpSpeed=LERP_SPEED_MIN+Math.random()*(LERP_SPEED_MAX-LERP_SPEED_MIN);
		}
		const TAU=Math.PI*2;
		let dAngle=((this.targetGunAngle-this.mainGunAngle)%TAU+TAU)%TAU;
		if (dAngle>TAU/2) {
			dAngle=dAngle-TAU;
		}
		dAngle=Math.max(-1, Math.min(1, dAngle));
		this.mainGunAngle+=this._lerp(0, dAngle, this.lerpSpeed);
		this.props.tankToDisplay.setTurretAngleForDisplayOnly(this.mainGunAngle);
	}

	_rerender(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.fillStyle = '#000921';
		ctx.fillRect(0, 0, 1e9, 1e9);
		const drawer=new ImageDrawer(ctx, () => 400, () => 400);
		drawer.setZoomScale(8);
		this.props.tankToDisplay.position=new Vec(0, 0);
		this.props.tankToDisplay.render(drawer);
	}

	_resizeCanvas(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const targetWidth=canvas.clientWidth;
		const targetHeight=targetWidth*8/16;
		if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
			canvas.width = targetWidth;
			canvas.height = targetHeight;
		}
	}

	_lerp(a: number, b: number, time: number): number {
		return b*time+a*(1-time);
	}

}

export default TankDisplay;
