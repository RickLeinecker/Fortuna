//@flow strict

import * as React from 'react';
import CasusBlock from './blocks/CasusBlock.js';
import ContainerBlock from './blocks/ContainerBlock.js';
import EmptyBlock from './blocks/EmptyBlock.js';
import Vec from './blocks/Vec.js';
import SelectVariablePopup from './userInteraction/SelectVariablePopup.js';
import GetVariableBlock from './blocks/GetVariableBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import DefineFunctionBlock from './blocks/DefineFunctionBlock.js';
import CallFunctionBlock from './blocks/CallFunctionBlock.js';
import ClickProcessedReceipt from './blocks/ClickProcessedReceipt.js';
import {isDefaultVariableName} from './userInteraction/defaultVariableNames.js';
import './CasusEditor.css';
import saveCasus from './saveCasus.js';
import loadCasus from './loadCasus.js';
import casusBlockDeepClone from './casusBlockDeepClone.js';

import type {DataType} from './blocks/DataType.js';

type Props = {|
	draggedBlocks: ?Array<CasusBlock>,
	onDraggedBlocksReleased: () => void,
	onBlocksDragged: (Array<CasusBlock>) => void
|};

type State = {|
	containerBlock: ContainerBlock,
	mouseX: number,
	mouseY: number,
	mouseOnScreen: boolean,
	variableBlockToRename: GetVariableBlock | SetVariableBlock | DefineFunctionBlock | CallFunctionBlock | null,
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
		const containerBlock: ContainerBlock = new ContainerBlock([]);

		loadCasus(
			casusBlock => {
				this.setState({
					containerBlock: casusBlock,
				});
				this._rerender();
			}
		);

		this.state={
			containerBlock: containerBlock,
			mouseX: 0,
			mouseY: 0,
			mouseOnScreen: false,
			variableBlockToRename: null,
		}
	}

	componentDidMount(): void {
		window.addEventListener('resize', this.onResize);
		const canvas: HTMLCanvasElement = this.refs.canvas;
		canvas.onmousemove = (e: MouseEvent) => this.onMouseMove(e);
		canvas.onmouseout = () => this.onMouseOut();
		canvas.onmouseup = () => this.onMouseUp();
		canvas.onmousedown = (e: MouseEvent) => this.onMouseDown(e);
		canvas.oncontextmenu = (e: CanPreventDefaultEvent) => {e.preventDefault();};
		canvas.style.height = '360px';

		this._rerender();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize);
	}

	onResize = () => this._rerender();

	render(): React.Node {
		return (
			<div className="casusEditorContainingDiv">
				<canvas 
					className="casusEditorCanvas"
					ref="canvas" 
				/>
				<SelectVariablePopup 
					variableBlockToRename={this.state.variableBlockToRename}
					onCancelClicked={() => this.onCancelClicked()}
					onVariableCreated={(created: string) => this.onVariableCreated(created)}
					getExistingVariableNames={(dataType) => this._getExistingVariableNames(dataType)}
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
		this._openSelectVariablePopupIfNeeded();

		const wouldPlaceOnEmptyVoid = this._wouldPlaceOnEmptyVoid();
		this._tryToPlace(null);
		if (!wouldPlaceOnEmptyVoid) {
			this._tryToPlaceInContainerBlock(null);
		}

		this.props.onDraggedBlocksReleased();
		this._rerender();
		this._saveCasus();
	}

	onMouseDown(e: MouseEvent) {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const boundingBox: ClientRect = canvas.getBoundingClientRect();

		const eventPos=new Vec(e.clientX - boundingBox.left, e.clientY - boundingBox.top);
		const rightButton = e.button === RIGHT_BUTTON_CODE;
		
		let toSelect: Array<CasusBlock> = [];
		if (rightButton) {
			const wouldHaveRemoved = this.state.containerBlock.removeBlockAt(eventPos, false, true);
			if (!this._isClickProcessedReceipt(wouldHaveRemoved)) {
				toSelect=[];
				//be sure to rerender at the end of processing
				for (const block of wouldHaveRemoved) {
					toSelect.push(casusBlockDeepClone(block));
				}
			}
		}
		else {
			toSelect = this.state.containerBlock.removeBlockAt(eventPos, true, false);
			if (this._isClickProcessedReceipt(toSelect)) {
				//be sure to rerender at the end of processing
				toSelect= [];
			}
		}
		if (toSelect.length > 0) {
			this.props.onBlocksDragged(toSelect);
		}

		this._rerender();
		this._saveCasus();
	}

	onVariableCreated(variableName: string) {
		const toRename=this.state.variableBlockToRename;
		if (toRename instanceof GetVariableBlock) {
			toRename.variableName = variableName;
		}
		if (toRename instanceof SetVariableBlock) {
			toRename.variableName = variableName;
		}
		if (toRename instanceof CallFunctionBlock) {
			toRename.functionName = variableName;
		}
		if (toRename instanceof DefineFunctionBlock) {
			toRename.functionName = variableName;
		}
		this.setState({variableBlockToRename: null});

		this._rerender();
		this._saveCasus();
	}

	onCancelClicked() {
		//delete VariableBlockToRename
		const block=this.state.variableBlockToRename;
		if (block!=null) {
			const toRemovePos=new Vec(block.boundingBox.x+1, block.boundingBox.y+1);
			const deepest = this.state.containerBlock.getDeepestChildContainingPoint(toRemovePos);
			if (deepest === block) {
				this.state.containerBlock.removeBlockAt(toRemovePos, false, false);
			}
		}

		this.setState({variableBlockToRename: null});

		this._rerender();
		this._saveCasus();
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
	

		//extend canvas if I need to
		const heightString=canvas.style.height;
		const curHeight = parseInt(heightString.substring(0, heightString.length-2));
		if (curHeight<this.state.containerBlock.boundingBox.h+100) {
			const setTo=(this.state.containerBlock.boundingBox.h+100)+'px';
			canvas.style.height=setTo;
			this._rerender();
		}
	}

	_clearBackground(ctx: CanvasRenderingContext2D): void {
		//fill background
		ctx.fillStyle = '#3E5A6F';
		ctx.fillRect(0, 0, 100000, 100000);
	}

	_resizeCanvas(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		if (canvas.width !== canvas.clientWidth || canvas.height !==canvas.clientHeight) {
			canvas.width=canvas.clientWidth;
			canvas.height=canvas.clientHeight;
		}
	}

	_getExistingVariableNames(dataType: DataType) {
		return this.state.containerBlock.getExistingVariableNames(dataType);
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

	_tryToPlace(ctx: ?CanvasRenderingContext2D):void {
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

	_tryToPlaceInContainerBlock(ctx: ?CanvasRenderingContext2D): void {
		if (this.props.draggedBlocks != null) {
			const mousePos = new Vec(this.state.mouseX, this.state.mouseY);
			const blockToTryPlace = this.props.draggedBlocks.length === 1 ? 
				this.props.draggedBlocks[0] :
				new ContainerBlock(this.props.draggedBlocks);
			if (blockToTryPlace.getReturnType() !== 'VOID') {
				return;
			}

			blockToTryPlace.precompBounds();

			this.state.containerBlock.tryToPlaceInContainer(mousePos, blockToTryPlace, ctx, true);	
		}
	}

	_isClickProcessedReceipt(blocksReturned: Array<CasusBlock>): boolean {
		if (blocksReturned.length === 1 && blocksReturned[0] instanceof ClickProcessedReceipt) {
			return true;
		}
		return false;
	}

	_openSelectVariablePopupIfNeeded(): void {
		if (this.props.draggedBlocks == null) {
			return;
		}
		if (this.props.draggedBlocks.length !== 1) {
			return;
		}
		const released=this.props.draggedBlocks[0];
		if (
			released instanceof GetVariableBlock || 
			released instanceof SetVariableBlock
		) {
			if (isDefaultVariableName(released.variableName)) {
				this.setState({variableBlockToRename: released});
			}
		}
		else if (
			released instanceof DefineFunctionBlock || 
			released instanceof CallFunctionBlock
		) {
			if (isDefaultVariableName(released.functionName)) {
				this.setState({variableBlockToRename: released});
			}
		}
	}

	_saveCasus(): void {
		saveCasus(this.state.containerBlock, null, () => {});
	}

}

export default CasusEditor;

