//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import measureText from './measureText.js';
import Vec from './Vec.js';
import generateCornerPerim from './generateCornerPerim.js';

import {
	SET_LIST_AT_SET_WIDTH, 
	SET_LIST_AT_AT_WIDTH, 
	SET_LIST_AT_TO_WIDTH, 
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js'

class SetListAtBlock extends CasusBlock {

	listName: string;
	indexBlock: CasusBlock;
	expressionBlock: CasusBlock;
	_listNameBoundingBox: BoundingBox;
	paramType: DataType;

	constructor(listName: string, paramType: DataType) {
		super();

		this.listName = listName;
		this.indexBlock = new EmptyBlock('INT');
		this.expressionBlock = new EmptyBlock(paramType);
		this._listNameBoundingBox = measureText(listName);
		this.paramType = paramType;
	}

	precompBounds(): void {
		this.indexBlock.precompBounds();
		this.expressionBlock.precompBounds();
		this._listNameBoundingBox = measureText(this.listName);

		const width = RAMP_WIDTH + SET_LIST_AT_SET_WIDTH + this._listNameBoundingBox.w + 
			SET_LIST_AT_AT_WIDTH + this.indexBlock.boundingBox.w + SET_LIST_AT_TO_WIDTH +
			this.expressionBlock.boundingBox.w + RAMP_WIDTH;
		const height = VPADDING + 
			Math.max(this.expressionBlock.boundingBox.h, this.indexBlock.boundingBox.h) + 
			VPADDING;

		this.boundingBox=new BoundingBox(
			0, 
			0, 
			width,
			height
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
		let curX = x + RAMP_WIDTH + SET_LIST_AT_SET_WIDTH + this._listNameBoundingBox.w
			+ SET_LIST_AT_AT_WIDTH;
		const centerY = y + this.boundingBox.h/2;

		this.indexBlock.precompXY(curX, centerY-this.indexBlock.boundingBox.h/2);
		curX+=this.indexBlock.boundingBox.w;
		curX+=SET_LIST_AT_TO_WIDTH;
		this.expressionBlock.precompXY(curX, centerY-this.expressionBlock.boundingBox.h/2);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.indexBlock, this.expressionBlock];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		const indexRes=this.indexBlock.removeBlockAt(v, removeAfter);
		if (indexRes.length > 0) {
			return indexRes;
		}
		if (this.indexBlock.boundingBox.contains(v) && this.indexBlock.draggable()) {
			const toReturn=[this.indexBlock];
			this.indexBlock=new EmptyBlock('INT');
			return toReturn;
		}

		const expressionRes=this.expressionBlock.removeBlockAt(v, removeAfter);
		if (expressionRes.length > 0) {
			return expressionRes;
		}
		if (this.expressionBlock.boundingBox.contains(v) && this.expressionBlock.draggable()) {
			const toReturn=[this.expressionBlock];
			this.expressionBlock=new EmptyBlock(this.paramType);
			return toReturn;
		}
		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, 'VOID');
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ee22aa';

		ctx.fillRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);

		ctx.fillStyle = '#000000';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		let curX=this.boundingBox.x + RAMP_WIDTH;
		const middleY=this.boundingBox.y + this.boundingBox.h/2;
		ctx.fillText(
			'set', 
			curX + SET_LIST_AT_SET_WIDTH/2,
			middleY
		);
		curX+=SET_LIST_AT_SET_WIDTH;
		ctx.fillText(
			this.listName, 
			curX + this._listNameBoundingBox.w/2,
			middleY
		);
		curX+= this._listNameBoundingBox.w;
		ctx.fillText(
			'at', 
			curX + SET_LIST_AT_AT_WIDTH/2,
			middleY
		);
		curX+=SET_LIST_AT_AT_WIDTH;
		curX+=this.indexBlock.boundingBox.w;
		ctx.fillText(
			'to', 
			curX + SET_LIST_AT_TO_WIDTH/2,
			middleY
		);

	}

	getReturnType(): DataType {
		return 'VOID';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.indexBlock = this.indexBlock.tryToPlace(v, blockToPlace, ctx) ?? this.indexBlock;
		this.expressionBlock = this.expressionBlock.tryToPlace(v, blockToPlace, ctx) ?? this.expressionBlock;
		return null;
	}

}

export default SetListAtBlock;
