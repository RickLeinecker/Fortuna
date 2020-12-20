//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import ContainerBlock from './ContainerBlock.js';
import measureText from './measureText.js';
import {isDefaultVariableName} from '../userInteraction/defaultVariableNames.js';
import Vec from './Vec.js';
import {getInterpriterState} from '../interpreter/InterpriterState.js';
import ClickProcessedReceipt from './ClickProcessedReceipt.js';

import type {DataType} from './DataType.js';

import {
	RAMP_WIDTH, 
	VPADDING,
	EMPTY_STATEMENT_HEIGHT,
} from './generateCornerPerim.js';

class DefineFunctionBlock extends CasusBlock {

	contents: ContainerBlock;
	headerBoundingBox: BoundingBox;
	expandBoundingBox: BoundingBox;
	prefixName: string;
	functionName: string;
	expanded: boolean;

	constructor(functionName: string, expanded: boolean) {
		super('DefineFunctionBlock');
		this.contents = new ContainerBlock();
		this.prefixName = 'Define ';
		this.functionName = functionName;
		this.expanded = expanded;
	}

	precompBounds(): void {
		const textWidth = measureText(this.prefixName + this.functionName + this._getSuffixName()).w;
		let width = RAMP_WIDTH + textWidth + RAMP_WIDTH;
		let height = VPADDING + EMPTY_STATEMENT_HEIGHT + VPADDING;

		this.contents.precompBounds();
		width = Math.max(width, this.contents.boundingBox.w + RAMP_WIDTH);
		this.headerBoundingBox = new BoundingBox(0, 0, width, height);	
		const suffixWidth = measureText(this._getSuffixName()).w;
		this.expandBoundingBox = new BoundingBox(0, 0, suffixWidth, height);

		if (this.expanded) {
			height+=this.contents.boundingBox.h;
		}
		height+=RAMP_WIDTH;

		this.boundingBox = new BoundingBox(0, 0, width, height);
	}

	getPerim(): Array<Vec> {
		const toReturn: Array<Vec> = [];
		const header=this.headerBoundingBox;
		const bounding=this.boundingBox;

		toReturn.push(new Vec(header.x, header.y));
		toReturn.push(new Vec(header.x+header.w, header.y));
		toReturn.push(new Vec(header.x+header.w, header.y+header.h));
		toReturn.push(new Vec(header.x+RAMP_WIDTH, header.y+header.h));
		toReturn.push(new Vec(header.x+RAMP_WIDTH, bounding.y+bounding.h-RAMP_WIDTH));
		toReturn.push(new Vec(bounding.x+bounding.w, bounding.y+bounding.h-RAMP_WIDTH));
		toReturn.push(new Vec(bounding.x+bounding.w, bounding.y+bounding.h));
		toReturn.push(new Vec(bounding.x, bounding.y+bounding.h));

		return toReturn;
	}

	precompXY(x: number, y:number): void {
		this.headerBoundingBox.x=x;
		this.headerBoundingBox.y=y;
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		this.expandBoundingBox.x=this.headerBoundingBox.x+this.headerBoundingBox.w-this.expandBoundingBox.w;
		this.expandBoundingBox.y=this.headerBoundingBox.y;

		const curX = x + RAMP_WIDTH;
		const curY = y + this.headerBoundingBox.h;
		this.contents.precompXY(curX, curY);
	}

	getChildBlocks(): Array<CasusBlock> {
		if (this.expanded) {
			return [this.contents];
		}
		else {
			return [];
		}
	}

	removeBlockAt(v: Vec, removeAfter: boolean, justReturnCopy: boolean): Array<CasusBlock> {
		if (this.expandBoundingBox.contains(v)) {
			this.expanded = !this.expanded;
			return [new ClickProcessedReceipt()];
		}
		if (this.expanded) {
			return this.contents.removeBlockAt(v, removeAfter, justReturnCopy);
		}
		else {
			return [];
		}
	}

	getExistingVariableNames(dataType: DataType): Array<string> {
		const existing=this.expanded?this.contents.getExistingVariableNames(dataType):[];
		if (dataType === 'VOID' && !isDefaultVariableName(this.functionName)) {
			if (!existing.includes(this.functionName)) {
				existing.push(this.functionName);
			}
		}
		return existing;
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#222233';
		const textWidth = measureText(this.prefixName + this.functionName).w;
		const plusTextWidth = measureText(this._getSuffixName()).w;

		const perim: Array<Vec> = this.getPerim();
		ctx.beginPath();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}
		ctx.fill();

		ctx.fillStyle = '#047acc';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const curX = this.boundingBox.x + RAMP_WIDTH;
		ctx.fillText(
			this.prefixName + this.functionName, 
			curX + textWidth/2,
			this.headerBoundingBox.y + this.headerBoundingBox.h/2
		);
		ctx.fillText(this._getSuffixName(),
			this.headerBoundingBox.x+this.headerBoundingBox.w-plusTextWidth/2 - RAMP_WIDTH,
			this.headerBoundingBox.y+this.headerBoundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return 'VOID';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		if (this.expanded) {
			const result = this.contents.tryToPlace(v, blockToPlace, ctx);
			if (result != null) {
				console.log('ERROR! placing block in contents returned non-null meaning it got replaced!');
			}
		}
		return null;
	}

	evaluate(): null {
		const interpreterState = getInterpriterState();
		interpreterState.setFunction(this.functionName, this);
		return null;
	}

	_getSuffixName(): string {
		return '    '+(this.expanded?'[ - ]':'[ + ]');
	}

}

export default DefineFunctionBlock;
