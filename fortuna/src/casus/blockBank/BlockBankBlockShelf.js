//@flow strict

import * as React from 'react';
import ForBlock from '../blocks/ForBlock.js';
import CasusBlock from '../blocks/CasusBlock.js';
import AndBlock from '../blocks/AndBlock.js';
import OrBlock from '../blocks/OrBlock.js';
import IntEqualsBlock from '../blocks/IntEqualsBlock.js';
import IntGreaterThanBlock from '../blocks/IntGreaterThanBlock.js';
import IntLessThanBlock from '../blocks/IntLessThanBlock.js';
import ContainerBlock from '../blocks/ContainerBlock.js';
import Vec from '../blocks/Vec.js';
import './BlockBankBlockShelf.css';

import type {BlockBankType} from './BlockBankType.js';

const ADJACENT_BLOCK_PADDING = 10;

type Props = {|
	draggedBlocks: ?Array<CasusBlock>,
	onDraggedBlocksReleased: () => void,
	onBlocksDragged: (Array<CasusBlock>) => void,
	selectedSection: BlockBankType
|};

type State = {|
	blocksOnShelf: Array<CasusBlock>,
	mouseX: number,
	mouseY: number,
	mouseOnScreen: boolean
|};

type MouseEvent = {
	clientX: number;
	clientY: number;
};

type CanPreventDefaultEvent = {
	preventDefault: () => void;
};

class BlockBankBlockShelf extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			blocksOnShelf: this._getBlocksOfType(props.selectedSection),
			mouseX: 0,
			mouseY: 0,
			mouseOnScreen: false
		};
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

	componentDidUpdate(prevProps: Props, prevState: State): void {
		//Good practice to prevent infinite loop: 
		//https://reactjs.org/docs/react-component.html#componentdidupdate
		if (this.props.selectedSection !== prevProps.selectedSection) {
			this.setState({
				blocksOnShelf: this._getBlocksOfType(this.props.selectedSection),
			});
		}
		if (this.state !== prevState) {
			this._rerender();
		}
	}

	render(): React.Node {
		return (
			<canvas
				className="blockBankBlockShelfCanvas"
				ref="canvas"
			/>
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

	onMouseDown(e: MouseEvent): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const eventPos=new Vec(e.clientX - boundingBox.left, e.clientY - boundingBox.top);
		for (const block: CasusBlock of this.state.blocksOnShelf) {
			if (block.boundingBox.contains(eventPos)) {
				//then this was clicked
				this.props.onBlocksDragged([block]);
				this.setState({
					blocksOnShelf: this._getBlocksOfType(this.props.selectedSection)
				});
				break;
			}
		}
		this._rerender();
	}

	_rerender(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

		this._resizeCanvas();
		this._clearBackground(ctx);
		this._renderBlocks(ctx, this.state.blocksOnShelf);

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
		ctx.fillStyle = 'gray';
		ctx.fillRect(0, 0, 100000, 10000);
	}

	_resizeCanvas(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		if (canvas.width !== canvas.clientWidth || canvas.height !==canvas.clientHeight) {
			canvas.width=canvas.clientWidth;
			canvas.height=canvas.clientHeight;
		}
	}

	_getBlocksOfType(type: BlockBankType): Array<CasusBlock> {
		let blocks=[];
		switch(type) {
			case 'CONTROL_FLOW':
				blocks = this._getControlFlowBlocks();
				break;
			case 'MATH':
				blocks = this._getMathBlocks();
				break;
			case 'VARIABLES':
				blocks = [];
				break;
			case 'LOGIC':
				blocks = this._getLogicBlocks();
				break;
			case 'LISTS':
				blocks = [];
				break;
			default:
				console.log('unexpected BlockBankType: '+type+' in getBlocksOfType!');
				break;
		}

		let x=10;
		let y=10;
		for (const block: CasusBlock of blocks) {
			block.precompBounds();
			block.precompXY(x, y);
			x += block.boundingBox.w + ADJACENT_BLOCK_PADDING;
		}

		return blocks;
	}

	_getControlFlowBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new ForBlock());
		return blocks;
	}

	_getMathBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new IntEqualsBlock());
		blocks.push(new IntGreaterThanBlock());
		blocks.push(new IntLessThanBlock());
		return blocks;
	}

	_getLogicBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new AndBlock());
		blocks.push(new OrBlock());
		return blocks;
	}

	_renderBlocks(ctx: CanvasRenderingContext2D, blocks: Array<CasusBlock>) {
		for (const block: CasusBlock of blocks) {
			block.renderDFS(ctx);
		}
	}

}

export default BlockBankBlockShelf;
