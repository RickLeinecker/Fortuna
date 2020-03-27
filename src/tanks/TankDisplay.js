//@flow strict

import * as React from 'react';
import Tank from './Tank.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import {imageLoaderInit, getImage, addCallbackWhenImageLoaded} from '../battleground/ImageLoader.js';
import './TankDisplay.css';

type Props = {|
	tankToDisplay: Tank
|};

type State = {|
|};

class TankDisplay extends React.Component<Props, State> {
	alive: boolean;

	constructor(props: Props) {
		super();
		window.addEventListener('resize', () => this._rerender());
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());
	}

	componentDidUpdate(): void {
		this._rerender();
	}

	componentDidMount(): void {
		this._rerender();
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

	_rerender(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.fillStyle = '#000921';
		ctx.fillRect(0, 0, 1e9, 1e9);
		const drawer=new ImageDrawer(ctx, () => 400, () => 400);
		drawer.setZoomScale(8);
		drawer.draw(getImage('SHADOW'), new Vec(0, 0), 17, 0);
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


}

export default TankDisplay;
