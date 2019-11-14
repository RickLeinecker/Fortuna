//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBooleanBlock from './EmptyBooleanBlock.js';
import Vec from './Vec.js'

const CENTER_WIDTH = 50;
const RAMP_WIDTH = 10;
const VPADDING = 5;

class AndBlock extends CasusBlock {

	lChild: CasusBlock;
	rChild: CasusBlock;

	constructor() {
		super();
		this.lChild=new EmptyBooleanBlock();
		this.rChild=new EmptyBooleanBlock();
	}

	precompBounds(): void {
		this.lChild.precompBounds();
		this.rChild.precompBounds();

		this.boundingBox=new BoundingBox(
			0, 
			0, 
			RAMP_WIDTH + this.lChild.boundingBox.w + CENTER_WIDTH + this.rChild.boundingBox.w + RAMP_WIDTH, 
			VPADDING+Math.max(this.lChild.boundingBox.h, this.rChild.boundingBox.h)+VPADDING
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		const lChildX = x + RAMP_WIDTH;
		const rChildX = lChildX + this.lChild.boundingBox.w + CENTER_WIDTH;

		const lChildYSpace=this.boundingBox.h-this.lChild.boundingBox.h;
		const rChildYSpace=this.boundingBox.h-this.rChild.boundingBox.h;
		const lChildY=y+lChildYSpace/2;
		const rChildY=y+rChildYSpace/2;

		this.lChild.precompXY(lChildX, lChildY);
		this.rChild.precompXY(rChildX, rChildY);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.lChild, this.rChild];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#eeee22';

		const perim: Array<Vec> = this.getPerimiter();
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
		ctx.fillText(
			'and', 
			this.boundingBox.x + RAMP_WIDTH + this.lChild.boundingBox.w + CENTER_WIDTH/2, 
			this.boundingBox.y + this.boundingBox.h/2
		);

	}

	getPerimiter(): Array<Vec> {
		const perim: Array<Vec> = [];
		perim.push(new Vec(this.boundingBox.x, this.boundingBox.y + this.boundingBox.h/2));
		perim.push(new Vec(this.boundingBox.x + RAMP_WIDTH, this.boundingBox.y));
		perim.push(new Vec(this.boundingBox.x + this.boundingBox.w - RAMP_WIDTH, this.boundingBox.y));
		perim.push(new Vec(this.boundingBox.x + this.boundingBox.w, this.boundingBox.y + this.boundingBox.h/2));
		perim.push(new Vec(this.boundingBox.x + this.boundingBox.w - RAMP_WIDTH, this.boundingBox.y + this.boundingBox.h));
		perim.push(new Vec(this.boundingBox.x + RAMP_WIDTH, this.boundingBox.y + this.boundingBox.h));
		return perim;
	}
}

export default AndBlock;
