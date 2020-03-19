//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import ContainerBlock from './ContainerBlock.js';
import Vec from './Vec.js';
import {verifyBoolean} from '../interpreter/Value.js';

import type {DataType} from './DataType.js';

import {
	IF_BLOCK_IF_WIDTH,
	IF_ELSE_BLOCK_ELSE_WIDTH,
	EMPTY_STATEMENT_HEIGHT,
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';

class IfElseBlock extends CasusBlock {

	conditionBlock: CasusBlock;
	ifContents: ContainerBlock;
	elseContents: ContainerBlock;
	ifHeaderBoundingBox: BoundingBox;
	elseHeaderBoundingBox: BoundingBox;

	constructor() {
		super('IfElseBlock');
		this.conditionBlock = new EmptyBlock('BOOLEAN');
		this.ifContents = new ContainerBlock();
		this.elseContents = new ContainerBlock();
	}

	precompBounds(): void {
		this.conditionBlock.precompBounds();
		this.ifContents.precompBounds();
		this.elseContents.precompBounds();

		let width = Math.max(
			IF_BLOCK_IF_WIDTH + this.conditionBlock.boundingBox.w + RAMP_WIDTH, 
			this.ifContents.boundingBox.w + RAMP_WIDTH, 
			IF_ELSE_BLOCK_ELSE_WIDTH,
			this.elseContents.boundingBox.w + RAMP_WIDTH
		);
		let height = VPADDING + this.conditionBlock.boundingBox.h + VPADDING;

		this.ifHeaderBoundingBox = new BoundingBox(0, 0, width, height);	
		this.elseHeaderBoundingBox = new BoundingBox(
			0, 
			0, 
			width, 
			VPADDING + EMPTY_STATEMENT_HEIGHT + VPADDING
		);

		height+=this.ifContents.boundingBox.h;
		height+=this.elseHeaderBoundingBox.h;
		height+=this.elseContents.boundingBox.h;
		height+=RAMP_WIDTH;

		this.boundingBox = new BoundingBox(0, 0, width, height);
	}

	getPerim(): Array<Vec> {
		const toReturn: Array<Vec> = [];
		const ifHeader=this.ifHeaderBoundingBox;
		const elseHeader=this.elseHeaderBoundingBox;
		const bounding=this.boundingBox;

		toReturn.push(new Vec(ifHeader.x, ifHeader.y));
		toReturn.push(new Vec(ifHeader.x+ifHeader.w, ifHeader.y));
		toReturn.push(new Vec(ifHeader.x+ifHeader.w, ifHeader.y+ifHeader.h));
		toReturn.push(new Vec(ifHeader.x+RAMP_WIDTH, ifHeader.y+ifHeader.h));

		toReturn.push(new Vec(elseHeader.x+RAMP_WIDTH, elseHeader.y));
		toReturn.push(new Vec(elseHeader.x+elseHeader.w, elseHeader.y));
		toReturn.push(new Vec(elseHeader.x+elseHeader.w, elseHeader.y+elseHeader.h));
		toReturn.push(new Vec(elseHeader.x+RAMP_WIDTH, elseHeader.y+elseHeader.h));

		toReturn.push(new Vec(elseHeader.x+RAMP_WIDTH, bounding.y+bounding.h-RAMP_WIDTH));
		toReturn.push(new Vec(bounding.x+bounding.w, bounding.y+bounding.h-RAMP_WIDTH));
		toReturn.push(new Vec(bounding.x+bounding.w, bounding.y+bounding.h));
		toReturn.push(new Vec(bounding.x, bounding.y+bounding.h));

		return toReturn;
	}

	precompXY(x: number, y:number): void {
		this.ifHeaderBoundingBox.x=x;
		this.ifHeaderBoundingBox.y=y;
		this.boundingBox.x=x;
		this.boundingBox.y=y;

		let curX = x + IF_BLOCK_IF_WIDTH;
		let curY = y + VPADDING;

		this.conditionBlock.precompXY(curX, curY);

		curX = x + RAMP_WIDTH;
		curY = y + this.ifHeaderBoundingBox.h;
		this.ifContents.precompXY(curX, curY);
		curY+=this.ifContents.boundingBox.h;

		this.elseHeaderBoundingBox.x = x;
		this.elseHeaderBoundingBox.y = curY;
		curY+=this.elseHeaderBoundingBox.h;

		this.elseContents.precompXY(curX, curY);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.conditionBlock, this.ifContents, this.elseContents];
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

		const ifContentsRes = this.ifContents.removeBlockAt(v, removeAfter);
		if (ifContentsRes.length > 0) {
			return ifContentsRes;
		}
		return this.elseContents.removeBlockAt(v, removeAfter);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#0062ff';

		const perim: Array<Vec> = this.getPerim();
		ctx.beginPath();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}
		ctx.fill();

		ctx.fillStyle = '#000921';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		let curX = this.boundingBox.x;
		ctx.fillText(
			'if', 
			curX + IF_BLOCK_IF_WIDTH/2,
			this.ifHeaderBoundingBox.y + this.ifHeaderBoundingBox.h/2
		);
		ctx.fillText(
			'else', 
			curX + IF_ELSE_BLOCK_ELSE_WIDTH/2,
			this.elseHeaderBoundingBox.y + this.elseHeaderBoundingBox.h/2
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
		const result = this.ifContents.tryToPlace(v, blockToPlace, ctx);
		const result2 = this.elseContents.tryToPlace(v, blockToPlace, ctx);
		if (result != null || result2 != null) {
			console.log('ERROR! placing block in contents returned non-null meaning it got replaced!');
		}
		return null;
	}

	evaluate(): null {
		const condition=verifyBoolean(this.conditionBlock.evaluate());
		if (condition.val) {
			return this.ifContents.evaluate();
		}
		else {
			return this.elseContents.evaluate();
		}
	}

}

export default IfElseBlock;
