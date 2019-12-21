//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js'
import generateCornerPerim from './generateCornerPerim.js'

import {
	CENTER_WIDTH, 
	RAMP_WIDTH, 
	VPADDING, 
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js'

class ContainerBlock extends CasusBlock {

	children: Array<CasusBlock>;

	constructor() {
		super();

		this.children=[new EmptyBlock('VOID')];
	}

	precompBounds(): void {
		//set this.boundingBox
		let w:number = 0;
		let h:number = 0;
		for (const child of this.getChildBlocks()) {
			child.precompBounds();
			w=Math.max(w, child.boundingBox.w);
			h+=child.boundingBox.h;
		}
		this.boundingBox=new BoundingBox(0, 0, w, h);
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x = x;
		this.boundingBox.y = y;
		let curY: number = y;

		for (const child of this.getChildBlocks()) {
			child.precompXY(x, curY);
			curY+=child.boundingBox.h;
		}
	}

	getChildBlocks(): Array<CasusBlock> {
		return this.children;
	}

	getPerim(): Array<Vec> {
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
	}

}

export default ContainerBlock;
