//@flow strict

import * as React from 'react';
import ForBlock from '../blocks/ForBlock.js';
import CasusBlock from '../blocks/CasusBlock.js';
import './BlockBankBlockShelf.css';

import type {BlockBankType} from './BlockBankType.js';

type Props = {|
	selectedSection: BlockBankType
|};

class BlockBankBlockShelf extends React.Component<Props> {

	componentDidMount(): void {
		window.addEventListener('resize', () => this._rerender());	
		this._rerender();
	}

	componentDidUpdate(prevProps: Props): void {
		//Good practice to prevent infinite loop: 
		//https://reactjs.org/docs/react-component.html#componentdidupdate
		if (this.props.selectedSection !== prevProps.selectedSection) {
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

	_rerender(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

		this._resizeCanvas();
		this._clearBackground(ctx);

		switch(this.props.selectedSection) {
			case 'CONTROL_FLOW':
				this._renderControlFlowBlocks(ctx);
				break;
			case 'MATH':
				break;
			case 'VARIABLES':
				break;
			case 'LOGIC':
				break;
			case 'LISTS':
				break;
			default:
				break;
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

	_renderControlFlowBlocks(ctx: CanvasRenderingContext2D): void {
		const forLoop: CasusBlock = new ForBlock();
		forLoop.precompBounds();
		forLoop.precompXY(10, 10);
		forLoop.renderDFS(ctx);
	}

}

export default BlockBankBlockShelf;
