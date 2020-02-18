//@flow strict

import * as React from 'react';
import './Battleground.css';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';

const NUM_IMAGES=1;

type Props = {||};
type State = {|
	imagesLoaded:number,

	//images to load
	dirtBackground: Image,
|};

class Battleground extends React.Component<Props, State> {

	constructor(props: Props) {
		super();
		this.state={
			imagesLoaded: 0,
			dirtBackground: new Image()
		};
		window.addEventListener('resize', () => this._rerender());
		this.state.dirtBackground.src='DirtBackground.png';
		this.state.dirtBackground.onload = ()=> {this._anotherImageLoaded();};
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
		if (this.state.imagesLoaded !== NUM_IMAGES) {
			return;
		}
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.drawImage(this.state.dirtBackground, 0, 0, getBattlegroundWidth(), getBattlegroundHeight());
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
		this.setState({imagesLoaded: this.state.imagesLoaded+1});
		if (this.state.imagesLoaded === NUM_IMAGES) {
			this._rerender();
		}
		if (this.state.imagesLoaded > NUM_IMAGES) {
			console.log('ERROR: NUM_IMAGES is only '+NUM_IMAGES+' but more than that were loaded!');
		}
	}

}

export default Battleground;
