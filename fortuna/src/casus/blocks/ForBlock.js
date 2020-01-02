//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import ContainerBlock from './ContainerBlock.js';
import Vec from './Vec.js';

import type {DataType} from './DataType.js';

import {
	FOR_BLOCK_FOR_WIDTH,
	FOR_BLOCK_SEMICOLON_WIDTH,
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';

class ForBlock extends CasusBlock {

	initializationBlock: CasusBlock;
	expressionBlock: CasusBlock;
	incrementBlock: CasusBlock;
	contents: ContainerBlock;
	headerBoundingBox: BoundingBox;

	constructor() {
		super();
		this.initializationBlock = new EmptyBlock('VOID');
		this.expressionBlock = new EmptyBlock('BOOLEAN');
		this.incrementBlock = new EmptyBlock('VOID');
		this.contents=new ContainerBlock();
	}

	precompBounds(): void {
		this.initializationBlock.precompBounds();
		this.expressionBlock.precompBounds();
		this.incrementBlock.precompBounds();

		const width = RAMP_WIDTH + FOR_BLOCK_FOR_WIDTH + 
			this.initializationBlock.boundingBox.w + FOR_BLOCK_SEMICOLON_WIDTH +
			this.expressionBlock.boundingBox.w + FOR_BLOCK_SEMICOLON_WIDTH +
			this.incrementBlock.boundingBox.w +
			RAMP_WIDTH;

		let height = VPADDING + 
				Math.max(this.initializationBlock.boundingBox.h, Math.max(this.expressionBlock.boundingBox.h,
				this.incrementBlock.boundingBox.h))
			+ VPADDING;

		this.headerBoundingBox = new BoundingBox(0, 0, width, height);	

		this.contents.precompBounds();
		height+=this.contents.boundingBox.h;

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

		let curX = x + RAMP_WIDTH + FOR_BLOCK_FOR_WIDTH;
		let curY = y;

		let vSpace = this.headerBoundingBox.h-this.initializationBlock.boundingBox.h;
		this.initializationBlock.precompXY(curX, curY+vSpace/2);
		curX += this.initializationBlock.boundingBox.w + FOR_BLOCK_SEMICOLON_WIDTH;

		vSpace = this.headerBoundingBox.h - this.expressionBlock.boundingBox.h;
		this.expressionBlock.precompXY(curX, curY+vSpace/2);
		curX += this.expressionBlock.boundingBox.w + FOR_BLOCK_SEMICOLON_WIDTH;

		vSpace = this.headerBoundingBox.h - this.incrementBlock.boundingBox.h;
		this.incrementBlock.precompXY(curX, curY+vSpace/2);

		curX = x + RAMP_WIDTH;
		curY = y + this.headerBoundingBox.h;
		this.contents.precompXY(curX, curY);
		curY+=this.contents.boundingBox.h;
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.initializationBlock, this.expressionBlock, this.incrementBlock, this.contents];
	}

	removeBlockAt(v: Vec): Array<CasusBlock> {
		const initializationRes = this.initializationBlock.removeBlockAt(v);
		if (initializationRes.length > 0) {
			return initializationRes;
		}
		if (this.initializationBlock.boundingBox.contains(v) && this.initializationBlock.draggable()) {
			const toReturn = [this.initializationBlock];
			this.initializationBlock = new EmptyBlock('VOID');
			return toReturn;
		}
		const expressionRes=this.expressionBlock.removeBlockAt(v);
		if (expressionRes.length > 0) {
			return expressionRes;
		}
		if (this.expressionBlock.boundingBox.contains(v) && this.expressionBlock.draggable()) {
			const toReturn = [this.expressionBlock];
			this.expressionBlock = new EmptyBlock('BOOLEAN');
			return toReturn;
		}
		const incrementRes = this.incrementBlock.removeBlockAt(v);
		if (incrementRes.length > 0) {
			return incrementRes;
		}
		if (this.incrementBlock.boundingBox.contains(v) && this.incrementBlock.draggable()) {
			const toReturn = [this.incrementBlock];
			this.incrementBlock = new EmptyBlock('VOID');
			return toReturn;
		}

		return this.contents.removeBlockAt(v);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#3322ee';

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

		let curX = this.boundingBox.x + RAMP_WIDTH;
		ctx.fillText(
			'for', 
			curX + FOR_BLOCK_FOR_WIDTH/2,
			this.headerBoundingBox.y + this.headerBoundingBox.h/2
		);
		curX += FOR_BLOCK_FOR_WIDTH + this.initializationBlock.boundingBox.w;
		ctx.fillText(
			';',
			curX + FOR_BLOCK_SEMICOLON_WIDTH/2,
			this.boundingBox.y + this.headerBoundingBox.h/2
		);
		curX += FOR_BLOCK_SEMICOLON_WIDTH + this.expressionBlock.boundingBox.w;
		ctx.fillText(
			';',
			curX + FOR_BLOCK_SEMICOLON_WIDTH/2,
			this.boundingBox.y + this.headerBoundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return 'VOID';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.initializationBlock = this.initializationBlock.tryToPlace(v, blockToPlace, ctx) 
			?? this.initializationBlock;
		this.expressionBlock = this.expressionBlock.tryToPlace(v, blockToPlace, ctx)
			?? this.expressionBlock;
		this.incrementBlock = this.incrementBlock.tryToPlace(v, blockToPlace, ctx)
			?? this.incrementBlock;
		const result = this.contents.tryToPlace(v, blockToPlace, ctx);
		if (result != null) {
			console.log('ERROR! placing block in for loop contents returned non-null meaning it got replaced!');
		}
		return null;
	}


}

export default ForBlock;
