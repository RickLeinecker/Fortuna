//@flow strict

import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import OrBlock from './blocks/OrBlock.js';
import VariableBlock from './blocks/VariableBlock.js';
import IntEqualsBlock from './blocks/IntEqualsBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import ForBlock from './blocks/ForBlock.js';
import ContainerBlock from './blocks/ContainerBlock.js';
import EmptyBlock from './blocks/EmptyBlock.js';
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
	clientY: number,
	button: ?number
}

type CanPreventDefaultEvent = {
	preventDefault: () => void;
}

const RIGHT_BUTTON_CODE=2;

class CasusEditor extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		const orBlock: OrBlock = new OrBlock();
		const orBlock2: CasusBlock = new OrBlock();
		const testVariable: CasusBlock = new VariableBlock('DOUBLE', 'Some variable with a really long name');
		const testEquals: IntEqualsBlock = new IntEqualsBlock();
		const setIntVariable: CasusBlock = new SetVariableBlock('answer', 'INT');
		const testForLoop: CasusBlock = new ForBlock();

		const containerBlock: ContainerBlock = new ContainerBlock([]);

		orBlock.lChild = orBlock2;

		containerBlock.children.push(orBlock);
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
		canvas.oncontextmenu = (e: CanPreventDefaultEvent) => {e.preventDefault();};

		this._rerender();
	}

	render(): React.Node {
		return (
			<div className="casusEditorContainingDiv">
				<canvas 
					className="casusEditorCanvas"
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
		const wouldPlaceOnEmptyVoid = this._wouldPlaceOnEmptyVoid();
		this._tryToPlace(null);
		if (!wouldPlaceOnEmptyVoid) {
			this._tryToPlaceInContainerBlock(null);
		}
		this.props.onDraggedBlocksReleased();
		this._rerender();
		console.log('Code state: ');
		console.log(this.state.containerBlock);
	}

	onMouseDown(e: MouseEvent) {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const eventPos=new Vec(e.clientX - boundingBox.left, e.clientY - boundingBox.top);
		const rightButton = e.button === RIGHT_BUTTON_CODE;
		
		let toSelect: Array<CasusBlock> = [];
		if (rightButton) {
			toSelect = this.state.containerBlock.removeBlocksAtAndAfter(eventPos);
		}
		else {
			toSelect = this.state.containerBlock.removeBlockAt(eventPos);
		}
		if (toSelect.length > 0) {
			this.props.onBlocksDragged(toSelect);
		}

		this._rerender();
		console.log("Code tree: ");
		console.log(this.state.containerBlock);
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

		//deal with highlights
		this.state.containerBlock.unhighlightEverything();
		const wouldPlaceOnEmptyVoid = this._wouldPlaceOnEmptyVoid();
		if (this.state.mouseOnScreen) {
			this._tryToPlace(ctx);
		}
		if (!wouldPlaceOnEmptyVoid) {
			this._tryToPlaceInContainerBlock(ctx);
		}
		containerBlock.highlightDFS(ctx);

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

	//checks if a realeased block would be placed on an empty block with void return type
	_wouldPlaceOnEmptyVoid(): boolean {
		if (this.props.draggedBlocks != null) {
			const mousePos = new Vec(this.state.mouseX, this.state.mouseY);
			const deepest=this.state.containerBlock.getDeepestChildContainingPoint(mousePos);
			if ((deepest instanceof EmptyBlock) && deepest.getReturnType() === 'VOID') {
				return true;
			}
		}
		return false;
	}

	_tryToPlace(ctx: ?CanvasRenderingContext2D) {
		if (this.props.draggedBlocks != null) {
			const mousePos = new Vec(this.state.mouseX, this.state.mouseY);
			const blockToTryPlace = this.props.draggedBlocks.length === 1 ? 
				this.props.draggedBlocks[0] :
				new ContainerBlock(this.props.draggedBlocks);
			blockToTryPlace.precompBounds();
			blockToTryPlace.precompXY(mousePos.x, mousePos.y);

			this.state.containerBlock.tryToPlace(mousePos, blockToTryPlace, ctx);
		}
	}

	_tryToPlaceInContainerBlock(ctx: ?CanvasRenderingContext2D) {
		if (this.props.draggedBlocks != null) {
			const mousePos = new Vec(this.state.mouseX, this.state.mouseY);
			const blockToTryPlace = this.props.draggedBlocks.length === 1 ? 
				this.props.draggedBlocks[0] :
				new ContainerBlock(this.props.draggedBlocks);
			if (blockToTryPlace.getReturnType() !== 'VOID') {
				return;
			}

			blockToTryPlace.precompBounds();

			this.state.containerBlock.tryToPlaceInContainer(mousePos, blockToTryPlace, ctx);	
		}
	}

}

export default CasusEditor;

