//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';

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
	contents: Array<CasusBlock>;
	headerBoundingBox: BoundingBox;

	constructor() {
		super();
		this.initializationBlock = new EmptyBlock('VOID');
		this.expressionBlock = new EmptyBlock('BOOLEAN');
		this.incrementBlock = new EmptyBlock('VOID');
		this.contents=[new EmptyBlock('VOID')];
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

		for (const statement: CasusBlock of this.contents) {
			statement.precompBounds();
			height += statement.boundingBox.h;
		}
		height+=RAMP_WIDTH;

		this.boundingBox = new BoundingBox(0, 0, width, height);
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
		for (const statement: CasusBlock of this.contents) {
			statement.precompXY(curX, curY);
			curY+=statement.boundingBox.h;
		}
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.initializationBlock, this.expressionBlock, this.incrementBlock].concat(this.contents);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#3322ee';

		ctx.fillRect(
			this.headerBoundingBox.x, 
			this.headerBoundingBox.y, 
			this.headerBoundingBox.w, 
			this.headerBoundingBox.h
		);
		ctx.fillRect(this.boundingBox.x, this.boundingBox.y, RAMP_WIDTH, this.boundingBox.h);
		ctx.fillRect(
			this.boundingBox.x,
			this.boundingBox.y + this.boundingBox.h - RAMP_WIDTH,
			this.boundingBox.w,
			RAMP_WIDTH
		);

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

}

export default ForBlock;
