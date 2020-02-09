//@flow strict

import BoundingBox from './BoundingBox.js';
import Vec from './Vec.js';
import {HIGHLIGHT_STROKE_WIDTH, BOARDER_STROKE_WIDTH} from './generateCornerPerim.js';

import type {DataType} from './DataType.js';
import type {Value} from '../interpreter/Value.js';

//Casus Block is the parent class that defines
//methods that will be called on blocks by the casus editor
//
//The following methods must be implemented:
//	precompBounds() - calls precompBounds on all child blocks of this,
//		then calculates this block's bounds
//
//	precompXY(x, y) - sets the x and y coordintates of this block now that
//		its bounds are known, and sets the absolute coordinates of all child blocks
//
//	getChildBlocks() - returns all child blocks of this block
//
//	removeBlockAt(v, removeAfter) - removes and returns the deepest block that contains
//		the defined position. If there is no block at the position, returns an empty array.
//
//	drawSelf(CanvasRenderingContext2D) - renders this block. All children of this
//		block will then be rendered on top of this
//
//	getReturnType() - gets the return type of the block
//
//	evaluate() - evaluates this block and returns a Value of the appropriate return type
//
//	(maybe):
//	getPerim() - returns an array of the perimeter of this block
//
//	(maybe):
//	tryToPlace(v, blockToPlace, ctx) - consider placing blockToPlace at
//		when it is realeased at v. Ignore call if v outside of boundingBox.
//		Return null if no change was made, or the block that replaces an empty
//		block if a change is made.
//		- If ctx is null, actually place it;
//		-	If ctx is nonnull, just draw highlights of it. 
//		- For everything other than EmptyBlock and ContainerBlock, this just needs to call
//		a dfs and maintain the set variables for all forms of children.
//

class CasusBlock {
	boundingBox: BoundingBox;
	highlighted: boolean;

	constructor() {
		this.boundingBox = new BoundingBox(0, 0, 0, 0);
		this.highlighted = false;
	}

	renderDFS(ctx: CanvasRenderingContext2D): void {
		this.drawSelf(ctx);
		for (const child of this.getChildBlocks()) {
			child.renderDFS(ctx);
		}
		//draw outline
		const perim=this.getPerim();
		if (perim.length !== 0 && !this.highlighted) {
			ctx.beginPath();
			ctx.strokeStyle = '#444444';
			ctx.lineWidth = BOARDER_STROKE_WIDTH;
			ctx.moveTo(perim[0].x, perim[0].y);
			for (const p: Vec of perim) {
				ctx.lineTo(p.x, p.y);
			}
			ctx.closePath();
			ctx.stroke();
		}
	}

	highlightDFS(ctx: CanvasRenderingContext2D): void {
		for (const child of this.getChildBlocks()) {
			child.highlightDFS(ctx);
		}
		//draw highlights
		const perim=this.getPerim();
		if (perim.length !== 0 && this.highlighted) {
			ctx.beginPath();
			ctx.strokeStyle = '#eeeeee';
			ctx.lineWidth = HIGHLIGHT_STROKE_WIDTH;
			ctx.moveTo(perim[0].x, perim[0].y);
			for (const p: Vec of perim) {
				ctx.lineTo(p.x, p.y);
			}
			ctx.closePath();
			ctx.stroke();
		}
	}

	unhighlightEverything(): void {
		this.highlighted=false;
		for (const child of this.getChildBlocks()) {
			child.unhighlightEverything();
		}
	}

	getDeepestChildContainingPoint(v: Vec): ?CasusBlock {
		for (const child of this.getChildBlocks()) {
			if (child.boundingBox.contains(v)) {
				return child.getDeepestChildContainingPoint(v);
			}
		}
		return this.boundingBox.contains(v) ? this : null;
	}

	//returns true if we were able to place it in some container, false otherwise
	tryToPlaceInContainer(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): boolean {
		if (!this.boundingBox.contains(v)) {
			return false;
		}
		for (const child of this.getChildBlocks()) {
			if (child.tryToPlaceInContainer(v, blockToPlace, ctx)) {
				return true;
			}
		}
		return false;
	}

	draggable(): boolean {
		return true;
	}

	// ----------------------- Methods to overload --------------------------
	precompBounds(): void {
		this.boundingBox=new BoundingBox(0, 0, 0, 0);
	}

	precompXY(x: number, y:number): void {
		this.boundingBox=new BoundingBox(x, y, this.boundingBox.w, this.boundingBox.h);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
	}

	getPerim(): Array<Vec> {
		return [
			new Vec(this.boundingBox.x, this.boundingBox.y),
			new Vec(this.boundingBox.x + this.boundingBox.w, this.boundingBox.y),
			new Vec(this.boundingBox.x + this.boundingBox.w, this.boundingBox.y + this.boundingBox.h),
			new Vec(this.boundingBox.x, this.boundingBox.y + this.boundingBox.h)
		];
	}

	getReturnType(): DataType {
		return 'VOID';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		return null;
	}

	evaluate(): ?Value {
		return null;
	}

}

export default CasusBlock;

