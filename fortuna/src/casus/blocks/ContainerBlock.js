//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js'

import type {DataType} from './DataType.js';

class ContainerBlock extends CasusBlock {

	children: Array<CasusBlock>;

	constructor(children: Array<CasusBlock> = [new EmptyBlock('VOID')]) {
		super();
		this.children=children;
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

	removeBlockAt(v: Vec): Array<CasusBlock> {
		for (let i=0; i<this.children.length; i++) {
			const child: CasusBlock = this.children[i];
			const childRes = child.removeBlockAt(v);
			if (childRes.length > 0) {
				return childRes;
			}
			if (child.boundingBox.contains(v) && child.draggable()) {
				return this.children.splice(i, 1);
			}
		}

		return [];
	}

	removeBlocksAtAndAfter(v: Vec): Array<CasusBlock> {
		for (let i=0; i<this.children.length; i++) {
			const child: CasusBlock = this.children[i];
			const childRes = child.removeBlockAt(v);
			if (childRes.length > 0) {
				return childRes;
			}
			if (child.boundingBox.contains(v) && child.draggable()) {
				return this.children.splice(i);
			}
		}

		return [];
	}

	draggable(): boolean {
		return false;
	}

	getPerim(): Array<Vec> {
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
	}

	getReturnType(): DataType {
		return 'VOID';
	}

}

export default ContainerBlock;
