//@flow strict

import CasusBlock from './CasusBlock.js';
import BoundingBox from './BoundingBox.js';
import Vec from './Vec.js'

const RAMP_WIDTH = 10;
const CENTER_WIDTH = 50;
const HEIGHT=30;

class SampleBlock extends CasusBlock {

	precompBoundingBox(minX: number, minY: number): void {
		this.boundingBox=new BoundingBox(
			minX, 
			minY, 
			RAMP_WIDTH + CENTER_WIDTH + RAMP_WIDTH, 
			HEIGHT
		);	
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#222222';
		ctx.beginPath();
		const perim: Array<Vec> = this.getPerimiter();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}

		ctx.fill();
	}

	getPerimiter(): Array<Vec> {
		const perim: Array<Vec> = [];
		perim.push(new Vec(this.boundingBox.x, this.boundingBox.y + this.boundingBox.h/2));
		perim.push(new Vec(this.boundingBox.x + RAMP_WIDTH, this.boundingBox.y));
		perim.push(new Vec(this.boundingBox.x + RAMP_WIDTH + CENTER_WIDTH, this.boundingBox.y));
		perim.push(new Vec(this.boundingBox.x + this.boundingBox.w, this.boundingBox.y + this.boundingBox.h/2));
		perim.push(new Vec(this.boundingBox.x + RAMP_WIDTH + CENTER_WIDTH, this.boundingBox.y + this.boundingBox.h));
		perim.push(new Vec(this.boundingBox.x + RAMP_WIDTH, this.boundingBox.y + this.boundingBox.h));
		return perim;
	}
}

export default SampleBlock;
