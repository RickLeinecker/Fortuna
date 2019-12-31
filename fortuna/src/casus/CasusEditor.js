//@flow strict

import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import OrBlock from './blocks/OrBlock.js';
import VariableBlock from './blocks/VariableBlock.js';
import IntEqualsBlock from './blocks/IntEqualsBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import ForBlock from './blocks/ForBlock.js';
import ContainerBlock from './blocks/ContainerBlock.js';
import Vec from './blocks/Vec.js';

type Props = {||}
type State = {|
	containerBlock: CasusBlock
|}

type ClickEvent = {
	clientX: number,
	clientY: number
}

class CasusEditor extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		const emptyBlock: CasusBlock = new OrBlock();
		const testVariable: CasusBlock = new VariableBlock('DOUBLE', 'Some variable with a really long name');
		const testEquals: IntEqualsBlock = new IntEqualsBlock();
		const setIntVariable: CasusBlock = new SetVariableBlock('answer', 'INT');
		const testForLoop: CasusBlock = new ForBlock();

		const containerBlock: ContainerBlock = new ContainerBlock();

		containerBlock.children.push(emptyBlock);
		containerBlock.children.push(testVariable);
		containerBlock.children.push(testEquals);
		containerBlock.children.push(setIntVariable);
		containerBlock.children.push(testForLoop);

		this.state={
			containerBlock: containerBlock
		}
	}

	componentDidMount(): void {
		window.addEventListener('resize', () => this._rerender());
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

		this._rerender();
	}

	processMouseClick(clickEvent: ClickEvent): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const x = clickEvent.clientX - boundingBox.left;
		const y = clickEvent.clientY - boundingBox.top;

		this.state.containerBlock.unhighlightEverything();
		const deepestClicked: CasusBlock = this.state.containerBlock.getDeepestChildContainingPoint(new Vec(x, y));
		deepestClicked.highlighted=true;
		
		this._rerender();
	}

	render(): React.Node {
		const style = {
			backgroundColor: '#ffffaa',
			justifyContent: 'center',
		};
		const canvasStyle = {
			backgroundColor: '#ffffff',
			height: '650px',
			width: '100%',
		};

		return (
			<div style={style}>
				<canvas 
					onClick={e => this.processMouseClick(e)}
					ref="canvas" 
					style={canvasStyle}
					width={1000}
					height={650}
					/>
			</div>
		);
	}

	_rerender(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

		this._resizeCanvas();
		this._clearBackground(ctx);

		const containerBlock=this.state.containerBlock;
		containerBlock.precompBounds();
		containerBlock.precompXY(0, 0);
		containerBlock.renderDFS(ctx);
	}

	_clearBackground(ctx: CanvasRenderingContext2D): void {
		//fill background
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, 100000, 100000);
	}

	_resizeCanvas(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		if (canvas.width !== canvas.clientWidth || canvas.height !==canvas.clientHeight) {
			canvas.width=canvas.clientWidth;
			canvas.height=canvas.clientHeight;
		}
	}

}

export default CasusEditor;

