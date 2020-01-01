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
import './CasusEditor.css';

type Props = {|
	draggedBlocks: ?Array<CasusBlock>,
	onDraggedBlocksReleased: () => void,
	onBlocksDragged: (Array<CasusBlock>) => void
|};

type State = {|
	containerBlock: CasusBlock,
	mouseX: number,
	mouseY: number,
	mouseOnScreen: boolean
|};

type MouseEvent = {
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
			containerBlock: containerBlock,
			mouseX: 0,
			mouseY: 0,
			mouseOnScreen: false
		}
	}

	componentDidMount(): void {
		window.addEventListener('resize', () => this._rerender());
		const canvas: HTMLCanvasElement = this.refs.canvas;
		canvas.onmousemove = (e: MouseEvent) => this.onMouseMove(e);
		canvas.onmouseout = () => this.onMouseOut();
		canvas.onmouseup = () => this.onMouseUp();
		canvas.onmousedown = (e: MouseEvent) => this.onMouseDown(e);

		this._rerender();
	}

	processMouseClick(clickEvent: MouseEvent): void {
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
		return (
			<div className="casusEditorContainingDiv">
				<canvas 
					className="casusEditorCanvas"
					onClick={e => this.processMouseClick(e)}
					ref="canvas" 
					/>
			</div>
		);
	}

	onMouseMove(e: MouseEvent): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();
		this.setState({
			mouseX: e.clientX - boundingBox.left,
			mouseY: e.clientY - boundingBox.top,
			mouseOnScreen: true
		});

		this._rerender();
	}

	onMouseOut(): void {
		this.setState({mouseOnScreen: false});
		this._rerender();
	}

	onMouseUp(): void {
		this.props.onDraggedBlocksReleased();
		this._rerender();
	}

	onMouseDown(e: mouseEvent) {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const eventPos=new Vec(e.clientX - boundingBox.left, e.clientY - boundingBox.top);
		
		//TODO: do some logic here to select and delete the blocks that were clicked

		this._rerender();
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

		if (this.state.mouseOnScreen && this.props.draggedBlocks != null) {
			const oldAlpha=ctx.globalAlpha;
			ctx.globalAlpha=0.5;
	
			const containerBlock=new ContainerBlock(this.props.draggedBlocks);
			containerBlock.precompBounds();
			containerBlock.precompXY(this.state.mouseX, this.state.mouseY);
			containerBlock.renderDFS(ctx);

			ctx.globalAlpha=oldAlpha;
		}
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

