//@flow strict

import BoundingBox from './BoundingBox.js';

//Casus Block is the parent class that defines
//methods that will be called on blocks by the casus editor
//
//The following methods must be implemented:
//	precompBoundingBox(minX, minY) - calls precompBoundingBox on all child blocks of this,
//		then calculates the bounding box for this block
//
//	getChildBlocks() - returns all child blocks of this block
//
//	drawSelf(CanvasRenderingContext2D) - renders this block. All children of this
//		block will then be rendered on top of this
//
class CasusBlock {
	boundingBox:BoundingBox;

	constructor() {
		this.boundingBox = new BoundingBox(0, 0, 0, 0);
	}

	renderDFS(ctx: CanvasRenderingContext2D): void {
		this.drawSelf(ctx);
		for (const child of this.getChildBlocks()) {
			child.renderDFS(ctx);
		}
	}


	// ----------------------- Methods to overload --------------------------
	precompBoundingBox(minX: number, minY: number): void {
		// blocks should override this to include their own custom logic
		this.boundingBox=new BoundingBox(minX, minY, 0, 0);
	}

	getChildBlocks(): Array<CasusBlock> {
		// blocks that may contain children should override this
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
	}

}

export default CasusBlock;

