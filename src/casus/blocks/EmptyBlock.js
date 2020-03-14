//@flow strict

import CasusBlock from './CasusBlock.js';
import BoundingBox from './BoundingBox.js';
import Vec from './Vec.js';
import {
	RAMP_WIDTH, 
	EMPTY_STATEMENT_WIDTH, 
	EMPTY_STATEMENT_HEIGHT,
} from './generateCornerPerim.js';
import generateCornerPerim from './generateCornerPerim.js';
import {defaultValueFor} from '../interpreter/Value.js';

import type {DataType} from './DataType.js';
import type {Value} from '../interpreter/Value.js';

class EmptyBlock extends CasusBlock {

	dataType: DataType;

	constructor(dataType: DataType) {
		super('EmptyBlock');
		this.dataType=dataType;
	}

	precompBounds(): void {
		this.boundingBox=new BoundingBox(
			0, 
			0,
			RAMP_WIDTH + EMPTY_STATEMENT_WIDTH + RAMP_WIDTH, 
			EMPTY_STATEMENT_HEIGHT
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox=new BoundingBox(x, y, this.boundingBox.w, this.boundingBox.h);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	draggable(): boolean {
		return false;
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.dataType);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#222222';
		ctx.beginPath();
		const perim: Array<Vec> = this.getPerim();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}
		ctx.fill();
	}

	getReturnType(): DataType {
		return this.dataType;
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		//if the return types don't match, you can't place it here
		if (this.getReturnType() !== blockToPlace.getReturnType()) {
			return null;
		}
		if (ctx == null) {
			//then actually place the block
			return blockToPlace;
		}
		else {
			//just draw the highlights
			this.highlighted=true;
			return null;
		}
	}

	evaluate(): ?Value {
		return defaultValueFor(this.dataType);
	}

}

export default EmptyBlock;
