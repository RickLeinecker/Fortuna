//@flow strict

import * as React from 'react';
import ForBlock from '../blocks/ForBlock.js';
import IfBlock from '../blocks/IfBlock.js';
import WhileBlock from '../blocks/WhileBlock.js';
import IfElseBlock from '../blocks/IfElseBlock.js';
import CasusBlock from '../blocks/CasusBlock.js';
import AndBlock from '../blocks/AndBlock.js';
import OrBlock from '../blocks/OrBlock.js';
import XorBlock from '../blocks/XorBlock.js';
import SetVariableBlock from '../blocks/SetVariableBlock.js';
import GetVariableBlock from '../blocks/GetVariableBlock.js';

import IntEqualsBlock from '../blocks/IntEqualsBlock.js';
import IntGreaterThanBlock from '../blocks/IntGreaterThanBlock.js';
import IntGreaterThanOrEqualBlock from '../blocks/IntGreaterThanOrEqualBlock.js';
import IntLessThanBlock from '../blocks/IntLessThanBlock.js';
import IntLessThanOrEqualBlock from '../blocks/IntLessThanOrEqualBlock.js';
import IntAddBlock from '../blocks/IntAddBlock.js';
import IntSubtractBlock from '../blocks/IntSubtractBlock.js';
import IntMultiplyBlock from '../blocks/IntMultiplyBlock.js';
import IntDivideBlock from '../blocks/IntDivideBlock.js';
import IntModuloBlock from '../blocks/IntModuloBlock.js';
import IntToDoubleBlock from '../blocks/IntToDoubleBlock.js';
import IntAbsBlock from '../blocks/IntAbsBlock.js';
import IntMaxBlock from '../blocks/IntMaxBlock.js';
import IntMinBlock from '../blocks/IntMinBlock.js';

import DoubleEqualsBlock from '../blocks/DoubleEqualsBlock.js';
import DoubleGreaterThanBlock from '../blocks/DoubleGreaterThanBlock.js';
import DoubleGreaterThanOrEqualBlock from '../blocks/DoubleGreaterThanOrEqualBlock.js';
import DoubleLessThanBlock from '../blocks/DoubleLessThanBlock.js';
import DoubleLessThanOrEqualBlock from '../blocks/DoubleLessThanOrEqualBlock.js';
import DoubleAddBlock from '../blocks/DoubleAddBlock.js';
import DoubleSubtractBlock from '../blocks/DoubleSubtractBlock.js';
import DoubleMultiplyBlock from '../blocks/DoubleMultiplyBlock.js';
import DoubleDivideBlock from '../blocks/DoubleDivideBlock.js';
import DoubleRoundBlock from '../blocks/DoubleRoundBlock.js';
import DoubleTruncateBlock from '../blocks/DoubleTruncateBlock.js';
import DoubleAbsBlock from '../blocks/DoubleAbsBlock.js';
import DoubleMaxBlock from '../blocks/DoubleMaxBlock.js';
import DoubleMinBlock from '../blocks/DoubleMinBlock.js';

import MathCosBlock from '../blocks/MathCosBlock.js';
import MathSinBlock from '../blocks/MathSinBlock.js';
import MathTanBlock from '../blocks/MathTanBlock.js';
import MathAcosBlock from '../blocks/MathAcosBlock.js';
import MathAsinBlock from '../blocks/MathAsinBlock.js';
import MathAtanBlock from '../blocks/MathAtanBlock.js';
import MathSqrtBlock from '../blocks/MathSqrtBlock.js';
import MathPowBlock from '../blocks/MathPowBlock.js';

import ContainerBlock from '../blocks/ContainerBlock.js';
import Vec from '../blocks/Vec.js';
import './BlockBankBlockShelf.css';
import {
	DEFAULT_INT_VARIABLE_NAME,
	DEFAULT_DOUBLE_VARIABLE_NAME,
	DEFAULT_BOOLEAN_VARIABLE_NAME
} from '../userInteraction/defaultVariableNames.js';

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
			case 'INTS':
				blocks = this._getIntsBlocks();
				break;
			case 'DOUBLES':
				blocks = this._getDoublesBlocks();
				break;
			case 'VARIABLES':
				blocks = this._getVariablesBlocks();
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
		let nextY=y;
		for (const block: CasusBlock of blocks) {
			if (x>940) {
				x=10;
				y=nextY+10;
			}
			block.precompBounds();
			nextY=Math.max(nextY, y+block.boundingBox.h);
			block.precompXY(x, y);
			x += block.boundingBox.w + ADJACENT_BLOCK_PADDING;
		}

		return blocks;
	}

	_getControlFlowBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new ForBlock());
		blocks.push(new IfBlock());
		blocks.push(new IfElseBlock());
		blocks.push(new WhileBlock());
		return blocks;
	}

	_getMathBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new MathCosBlock());
		blocks.push(new MathSinBlock());
		blocks.push(new MathTanBlock());
		blocks.push(new MathAcosBlock());
		blocks.push(new MathAsinBlock());
		blocks.push(new MathAtanBlock());
		blocks.push(new MathSqrtBlock());
		blocks.push(new MathPowBlock());
		return blocks;
	}

	_getIntsBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new IntEqualsBlock());
		blocks.push(new IntGreaterThanBlock());
		blocks.push(new IntGreaterThanOrEqualBlock());
		blocks.push(new IntLessThanBlock());
		blocks.push(new IntLessThanOrEqualBlock());
		blocks.push(new IntAddBlock());
		blocks.push(new IntSubtractBlock());
		blocks.push(new IntMultiplyBlock());
		blocks.push(new IntDivideBlock());
		blocks.push(new IntModuloBlock());
		blocks.push(new IntToDoubleBlock());
		blocks.push(new IntAbsBlock());
		blocks.push(new IntMaxBlock());
		blocks.push(new IntMinBlock());
		return blocks;
	}

	_getDoublesBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new DoubleEqualsBlock());
		blocks.push(new DoubleGreaterThanBlock());
		blocks.push(new DoubleGreaterThanOrEqualBlock());
		blocks.push(new DoubleLessThanBlock());
		blocks.push(new DoubleLessThanOrEqualBlock());
		blocks.push(new DoubleAddBlock());
		blocks.push(new DoubleSubtractBlock());
		blocks.push(new DoubleMultiplyBlock());
		blocks.push(new DoubleDivideBlock());
		blocks.push(new DoubleRoundBlock());
		blocks.push(new DoubleTruncateBlock());
		blocks.push(new DoubleAbsBlock());
		blocks.push(new DoubleMaxBlock());
		blocks.push(new DoubleMinBlock());
		return blocks;
	}

	_getVariablesBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new SetVariableBlock(DEFAULT_INT_VARIABLE_NAME, 'INT'));
		blocks.push(new SetVariableBlock(DEFAULT_BOOLEAN_VARIABLE_NAME, 'BOOLEAN'));
		blocks.push(new SetVariableBlock(DEFAULT_DOUBLE_VARIABLE_NAME, 'DOUBLE'));
		blocks.push(new GetVariableBlock(DEFAULT_INT_VARIABLE_NAME, 'INT'));
		blocks.push(new GetVariableBlock(DEFAULT_BOOLEAN_VARIABLE_NAME, 'BOOLEAN'));
		blocks.push(new GetVariableBlock(DEFAULT_DOUBLE_VARIABLE_NAME, 'DOUBLE'));
		return blocks;
	}

	_getLogicBlocks(): Array<CasusBlock> {
		const blocks: Array<CasusBlock> = [];
		blocks.push(new AndBlock());
		blocks.push(new OrBlock());
		blocks.push(new XorBlock());
		return blocks;
	}

	_renderBlocks(ctx: CanvasRenderingContext2D, blocks: Array<CasusBlock>) {
		for (const block: CasusBlock of blocks) {
			block.renderDFS(ctx);
		}
	}

}

export default BlockBankBlockShelf;
