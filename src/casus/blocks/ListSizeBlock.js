//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js';
import generateCornerPerim from './generateCornerPerim.js';

import {
	LIST_SIZE_SIZE_WIDTH, 
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';

import {listVersionOf} from './DataType.js'

import type {DataType} from './DataType.js'

class ListSizeBlock extends CasusBlock {

	list: CasusBlock;
	paramType: DataType;

	constructor(paramType: DataType) {
		super();

		this.list = new EmptyBlock(listVersionOf(paramType));
		this.paramType = paramType;
	}

	precompBounds(): void {
		this.list.precompBounds();

		const width = RAMP_WIDTH + this.list.boundingBox.w + 
			LIST_SIZE_SIZE_WIDTH + RAMP_WIDTH;
		const height = VPADDING + this.list.boundingBox.h + VPADDING;

		this.boundingBox=new BoundingBox(
			0, 
			0, 
			width,
			height
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		let curX = x + RAMP_WIDTH;
		const centerY = y + this.boundingBox.h/2;
		
		this.list.precompXY(curX, centerY-this.list.boundingBox.h/2);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.list];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		const listRes=this.list.removeBlockAt(v, removeAfter);
		if (listRes.length > 0) {
			return listRes;
		}
		if (this.list.boundingBox.contains(v) && this.list.draggable()) {
			const toReturn=[this.list];
			this.list = new EmptyBlock(listVersionOf(this.paramType));
			return toReturn;
		}

		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, 'INT');
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ee22aa';

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

		const middleY=this.boundingBox.y + this.boundingBox.h/2;
		ctx.fillText(
			'size', 
			this.boundingBox.x + RAMP_WIDTH + this.list.boundingBox.w + LIST_SIZE_SIZE_WIDTH/2,
			middleY
		);

	}

	getReturnType(): DataType {
		return 'INT';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.list = this.list.tryToPlace(v, blockToPlace, ctx) ?? this.list;
		return null;
	}

}

export default ListSizeBlock;
