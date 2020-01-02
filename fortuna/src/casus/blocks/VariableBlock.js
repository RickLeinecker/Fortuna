//@flow strict

import CasusBlock from './CasusBlock.js';
import BoundingBox from './BoundingBox.js';
import Vec from './Vec.js';
import {RAMP_WIDTH, EMPTY_STATEMENT_HEIGHT} from './generateCornerPerim.js';
import generateCornerPerim from './generateCornerPerim.js';
import measureText from './measureText.js';

import type {DataType} from './DataType.js';


class VariableBlock extends CasusBlock {

	dataType: DataType;
	name: string;

	constructor(dataType: DataType, name: string) {
		super();
		this.dataType=dataType;
		this.name=name;
	}

	precompBounds(): void {
		const mainWidth = measureText(this.name);
		this.boundingBox=new BoundingBox(
			0, 
			0,
			RAMP_WIDTH + mainWidth.w + RAMP_WIDTH, 
			EMPTY_STATEMENT_HEIGHT
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox=new BoundingBox(x, y, this.boundingBox.w, this.boundingBox.h);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.dataType);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ee5522';
		ctx.beginPath();
		const perim: Array<Vec> = this.getPerim();
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
			this.name,
			this.boundingBox.x + this.boundingBox.w/2, 
			this.boundingBox.y + this.boundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return this.dataType;
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: CanvasRenderingContext2D): ?CasusBlock {
		return null;
	}

}

export default VariableBlock;
