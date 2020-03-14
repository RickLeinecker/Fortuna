//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import ContainerBlock from './ContainerBlock.js';
import Vec from './Vec.js';

import type {DataType} from './DataType.js';
import type {BlockClass} from './BlockClass.js'

import {
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';

class SingleConditionHeader extends CasusBlock {

	conditionBlock: CasusBlock;
	contents: ContainerBlock;
	headerBoundingBox: BoundingBox;
	textWidth: number;
	text: string;

	constructor(blockClass: BlockClass, textWidth: number, text: string) {
		super(blockClass);
		this.conditionBlock = new EmptyBlock('BOOLEAN');
		this.contents = new ContainerBlock();

		this.textWidth = textWidth;
		this.text = text;
	}

	precompBounds(): void {
		this.conditionBlock.precompBounds();

		let width = this.textWidth + 
			this.conditionBlock.boundingBox.w + RAMP_WIDTH;
		let height = VPADDING + this.conditionBlock.boundingBox.h + VPADDING;


		this.contents.precompBounds();
		width = Math.max(width, this.contents.boundingBox.w + RAMP_WIDTH);
		this.headerBoundingBox = new BoundingBox(0, 0, width, height);	

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

		let curX = x + this.textWidth;
		let curY = y + VPADDING;

		this.conditionBlock.precompXY(curX, curY);

		curX = x + RAMP_WIDTH;
		curY = y + this.headerBoundingBox.h;
		this.contents.precompXY(curX, curY);
		curY+=this.contents.boundingBox.h;
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.conditionBlock, this.contents];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		const conditionRes = this.conditionBlock.removeBlockAt(v, removeAfter);
		if (conditionRes.length > 0) {
			return conditionRes;
		}
		if (this.conditionBlock.boundingBox.contains(v) && this.conditionBlock.draggable()) {
			const toReturn = [this.conditionBlock];
			this.conditionBlock = new EmptyBlock('BOOLEAN');
			return toReturn;
		}

		return this.contents.removeBlockAt(v, removeAfter);
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

		let curX = this.boundingBox.x;
		ctx.fillText(
			this.text, 
			curX + this.textWidth/2,
			this.headerBoundingBox.y + this.headerBoundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return 'VOID';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.conditionBlock = this.conditionBlock.tryToPlace(v, blockToPlace, ctx) 
			?? this.conditionBlock;
		const result = this.contents.tryToPlace(v, blockToPlace, ctx);
		if (result != null) {
			console.log('ERROR! placing block in contents returned non-null meaning it got replaced!');
		}
		return null;
	}


}

export default SingleConditionHeader;
