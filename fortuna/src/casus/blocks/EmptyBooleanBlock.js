//@flow strict

import CasusBlock from './CasusBlock.js';
import BoundingBox from './BoundingBox.js';
import Vec from './Vec.js';
import {RAMP_WIDTH, CENTER_WIDTH, EMPTY_STATEMENT_HEIGHT} from './generateCornerPerim.js';
import generateCornerPerim from './generateCornerPerim.js';

class EmptyBooleanBlock extends CasusBlock {

	precompBounds(): void {
		this.boundingBox=new BoundingBox(
			0, 
			0,
			RAMP_WIDTH + CENTER_WIDTH + RAMP_WIDTH, 
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
		ctx.fillStyle = '#222222';
		ctx.beginPath();
		const perim: Array<Vec> = generateCornerPerim(this.boundingBox, 'BOOLEAN');
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}

		ctx.fill();
	}
}

export default EmptyBooleanBlock;
