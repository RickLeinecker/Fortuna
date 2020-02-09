//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js'
import generateCornerPerim from './generateCornerPerim.js'
import measureText from './measureText.js'

import {
	CENTER_WIDTH, 
	RAMP_WIDTH, 
	VPADDING, 
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js'

class BinaryOperationBlock extends CasusBlock {

	lChild: CasusBlock;
	rChild: CasusBlock;
	paramType: DataType;
	rightParamType: DataType;
	returnType: DataType;
	centerText: string;
	centerTextWidth: number;
	leftText: string;
	leftTextWidth: number;

	constructor(
		paramType: DataType, 
		returnType: DataType, 
		centerText: string, 
		leftText: string = "", 
		rightParam: ?DataType = null
	) {
		super();

		this.paramType=paramType;
		this.returnType=returnType;
		this.centerText=centerText;
		this.centerTextWidth=measureText(centerText).w + CENTER_WIDTH;
		this.leftText=leftText;
		this.rightParamType=rightParam ?? paramType; 
		this.lChild=new EmptyBlock(paramType);
		this.rChild=new EmptyBlock(this.rightParamType);

		if (this.leftText.length === 0) {
			this.leftTextWidth = 0;
		}
		else {
			this.leftTextWidth = measureText(leftText).w + CENTER_WIDTH;
		}
	}

	precompBounds(): void {
		this.lChild.precompBounds();
		this.rChild.precompBounds();

		this.boundingBox=new BoundingBox(
			0, 
			0, 
			RAMP_WIDTH + this.leftTextWidth + 
				this.lChild.boundingBox.w + this.centerTextWidth + this.rChild.boundingBox.w + RAMP_WIDTH, 
			VPADDING+Math.max(this.lChild.boundingBox.h, this.rChild.boundingBox.h)+VPADDING
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		const lChildX = x + RAMP_WIDTH + this.leftTextWidth;
		const rChildX = lChildX + this.lChild.boundingBox.w + this.centerTextWidth;

		const lChildYSpace=this.boundingBox.h-this.lChild.boundingBox.h;
		const rChildYSpace=this.boundingBox.h-this.rChild.boundingBox.h;
		const lChildY=y+lChildYSpace/2;
		const rChildY=y+rChildYSpace/2;

		this.lChild.precompXY(lChildX, lChildY);
		this.rChild.precompXY(rChildX, rChildY);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.lChild, this.rChild];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		if (!this.boundingBox.contains(v)) {
			return [];
		}
		const lChildRes = this.lChild.removeBlockAt(v, removeAfter);
		if (lChildRes.length > 0) {
			return lChildRes;
		}
		if (this.lChild.boundingBox.contains(v) && this.lChild.draggable()) {
			const toReturn=[this.lChild];
			this.lChild=new EmptyBlock(this.paramType);
			return toReturn;
		}

		const rChildRes = this.rChild.removeBlockAt(v, removeAfter);
		if (rChildRes.length > 0) {
			return rChildRes;
		}
		if (this.rChild.boundingBox.contains(v) && this.rChild.draggable()) {
			const toReturn=[this.rChild];
			this.rChild=new EmptyBlock(this.rightParamType);
			return toReturn;
		}

		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.returnType);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#eeee22';

		const perim: Array<Vec> = this.getPerim();
		ctx.beginPath();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}
		ctx.fill();

		ctx.fillStyle = '#000000';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText(
			this.leftText, 
			this.boundingBox.x + RAMP_WIDTH + this.leftTextWidth/2,
			this.boundingBox.y + this.boundingBox.h/2
		);
		ctx.fillText(
			this.centerText, 
			this.boundingBox.x + RAMP_WIDTH + this.leftTextWidth + this.lChild.boundingBox.w + this.centerTextWidth/2, 
			this.boundingBox.y + this.boundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return this.returnType;
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.lChild = this.lChild.tryToPlace(v, blockToPlace, ctx) ?? this.lChild;
		this.rChild = this.rChild.tryToPlace(v, blockToPlace, ctx) ?? this.rChild;
		return null;
	}

}

export default BinaryOperationBlock;
