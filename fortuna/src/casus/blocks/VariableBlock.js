//@flow strict

import CasusBlock from './CasusBlock.js';
import BoundingBox from './BoundingBox.js';
import Vec from './Vec.js';
import {RAMP_WIDTH, EMPTY_STATEMENT_HEIGHT} from './generateCornerPerim.js';
import generateCornerPerim from './generateCornerPerim.js';

import type {DataType} from './DataType.js';

const measuringCTX: CanvasRenderingContext2D=document.createElement('canvas').getContext('2d');

class VariableBlock extends CasusBlock {

	dataType: DataType;
	name: string;

	constructor(dataType: DataType, name: string) {
		super();
		this.dataType=dataType;
		this.name=name;
	}

	precompBounds(): void {
		measuringCTX.font = '16px Arial';
		const mainWidth = measuringCTX.measureText(this.name).width;
		this.boundingBox=new BoundingBox(
			0, 
			0,
			RAMP_WIDTH + mainWidth + RAMP_WIDTH, 
			EMPTY_STATEMENT_HEIGHT
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox=new BoundingBox(x, y, this.boundingBox.w, this.boundingBox.h);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ee5522';
		ctx.beginPath();
		const perim: Array<Vec> = generateCornerPerim(this.boundingBox, this.dataType);
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
}

export default VariableBlock;
