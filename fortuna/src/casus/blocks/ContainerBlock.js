//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js'
import {HIGHLIGHT_STROKE_WIDTH} from './generateCornerPerim.js';

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
				const toReturn=this.children.splice(i, 1);
				if (this.children.length === 0) {
					this.children.push(new EmptyBlock('VOID'));
				}
				return toReturn;
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
				const toReturn=this.children.splice(i);
				if (this.children.length === 0) {
					this.children.push(new EmptyBlock('VOID'));
				}
				return toReturn;
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

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		for (let i = 0; i<this.children.length; i++) {
			this.children[i] = this.children[i].tryToPlace(v, blockToPlace, ctx) ?? this.children[i];
		}
	}

	tryToPlaceInContainer(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): boolean {
		if (!this.boundingBox.contains(v)) {
			return false;
		}
		//if I can place it in any of my children, don't worry about it here
		for (const child of this.getChildBlocks()) {
			if (child.tryToPlaceInContainer(v, blockToPlace, ctx)) {
				return true;
			}
		}
		
		//otherwise, we are going to place it here, so we need to find the closest y
		let bestIndex = 0;
		let bestError = Math.abs(this.boundingBox.y - v.y);
		let bestY = this.boundingBox.y;
		for (let potentialIndex=1; potentialIndex<=this.children.length; potentialIndex++) {
			const child = this.children[potentialIndex-1];
			const curY = child.boundingBox.y + child.boundingBox.h;
			const curError = Math.abs(curY - v.y);
			if (curError < bestError) {
				bestError = curError;
				bestIndex=potentialIndex;
				bestY = curY;
			}
		}
		if (ctx == null) {
			//then actually place it
			if (blockToPlace instanceof ContainerBlock) {
				const toPlace=(blockToPlace: ContainerBlock).children;
				for (let i=0; i<toPlace.length; i++) {
					this.children.splice(bestIndex, 0, ...toPlace);
				}
			}
			else {
				this.children.splice(bestIndex, 0, blockToPlace);
			}
		}
		else {
			//otherwise just draw the highlight
			ctx.beginPath();
			ctx.strokeStyle = '#eeeeee';
			ctx.lineWidth = HIGHLIGHT_STROKE_WIDTH;
			ctx.moveTo(this.boundingBox.x, bestY);
			ctx.lineTo(this.boundingBox.x + this.boundingBox.w, bestY);
			ctx.closePath();
			ctx.stroke();
		}
		return true;
	}

}

export default ContainerBlock;
