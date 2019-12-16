//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js'
import generateCornerPerim from './generateCornerPerim.js'

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
	returnType: DataType;
	centerText: string;

	constructor(paramType: DataType, returnType: DataType, centerText: string) {
		super();

		this.lChild=new EmptyBlock(paramType);
		this.rChild=new EmptyBlock(paramType);
		this.paramType=paramType;
		this.returnType=returnType;
		this.centerText=centerText;
	}

	precompBounds(): void {
		this.lChild.precompBounds();
		this.rChild.precompBounds();

		this.boundingBox=new BoundingBox(
			0, 
			0, 
			RAMP_WIDTH + this.lChild.boundingBox.w + CENTER_WIDTH + this.rChild.boundingBox.w + RAMP_WIDTH, 
			VPADDING+Math.max(this.lChild.boundingBox.h, this.rChild.boundingBox.h)+VPADDING
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		const lChildX = x + RAMP_WIDTH;
		const rChildX = lChildX + this.lChild.boundingBox.w + CENTER_WIDTH;

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
			this.boundingBox.x + RAMP_WIDTH + this.lChild.boundingBox.w + CENTER_WIDTH/2, 
			this.boundingBox.y + this.boundingBox.h/2
		);


	}

}

export default BinaryOperationBlock;
