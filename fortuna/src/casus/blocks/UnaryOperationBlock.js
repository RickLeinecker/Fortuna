//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js'
import measureText from './measureText.js';
import generateCornerPerim from './generateCornerPerim.js'

import {
	CENTER_WIDTH, 
	RAMP_WIDTH, 
	VPADDING, 
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js'

class UnaryOperationBlock extends CasusBlock {

	rChild: CasusBlock;
	paramType: DataType;
	returnType: DataType;
	centerText: string;
	textWidth: number;

	constructor(paramType: DataType, returnType: DataType, centerText: string) {
		super();

		this.rChild=new EmptyBlock(paramType);
		this.paramType=paramType;
		this.returnType=returnType;
		this.centerText=centerText;
		this.textWidth=measureText(centerText).w + CENTER_WIDTH;
	}

	precompBounds(): void {
		this.rChild.precompBounds();

		this.boundingBox=new BoundingBox(
			0, 
			0, 
			RAMP_WIDTH + this.textWidth + this.rChild.boundingBox.w + RAMP_WIDTH, 
			VPADDING + this.rChild.boundingBox.h + VPADDING
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		this.rChild.precompXY(x + RAMP_WIDTH + this.textWidth, y + VPADDING);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.rChild];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		if (!this.boundingBox.contains(v)) {
			return [];
		}

		const rChildRes = this.rChild.removeBlockAt(v, removeAfter);
		if (rChildRes.length > 0) {
			return rChildRes;
		}
		if (this.rChild.boundingBox.contains(v) && this.rChild.draggable()) {
			const toReturn=[this.rChild];
			this.rChild=new EmptyBlock(this.paramType);
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
			this.centerText, 
			this.boundingBox.x + RAMP_WIDTH + this.textWidth/2, 
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
		this.rChild = this.rChild.tryToPlace(v, blockToPlace, ctx) ?? this.rChild;
		return null;
	}

}

export default UnaryOperationBlock;
