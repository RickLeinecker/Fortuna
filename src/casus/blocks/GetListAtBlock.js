//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import Vec from './Vec.js';
import generateCornerPerim from './generateCornerPerim.js';
import {getInterpriterState} from '../interpreter/InterpriterState.js';
import InterpriterState from '../interpreter/InterpriterState.js';
import GetVariableBlock from './GetVariableBlock.js';
import {
	verifyInt, 
	verifyIntList,
	verifyBooleanList,
	verifyDoubleList,
	defaultValueFor
} from '../interpreter/Value.js';
import {
	GET_LIST_AT_AT_WIDTH, 
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';
import {listVersionOf} from './DataType.js'

import type {DataType} from './DataType.js'
import type {Value} from '../interpreter/Value.js';

class GetListAtBlock extends CasusBlock {

	list: CasusBlock;
	indexBlock: CasusBlock;
	paramType: DataType;

	constructor(paramType: DataType) {
		super('GetListAtBlock');

		this.list = new EmptyBlock(listVersionOf(paramType));
		this.indexBlock = new EmptyBlock('INT');
		this.paramType = paramType;
	}

	precompBounds(): void {
		this.list.precompBounds();
		this.indexBlock.precompBounds();

		const width = RAMP_WIDTH + this.list.boundingBox.w + 
			GET_LIST_AT_AT_WIDTH + this.indexBlock.boundingBox.w + RAMP_WIDTH;
		const height = VPADDING + 
			Math.max(
				this.list.boundingBox.h, 
				this.indexBlock.boundingBox.h) + 
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
		let curX = x + RAMP_WIDTH;
		const centerY = y + this.boundingBox.h/2;
		
		this.list.precompXY(curX, centerY-this.list.boundingBox.h/2);
		curX+=this.list.boundingBox.w;
		curX+=GET_LIST_AT_AT_WIDTH;
		this.indexBlock.precompXY(curX, centerY-this.indexBlock.boundingBox.h/2);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.list, this.indexBlock];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		const listRes=this.list.removeBlockAt(v, removeAfter);
		if (listRes.length > 0) {
			return listRes;
		}
		if (this.list.boundingBox.contains(v) && this.list.draggable()) {
			const toReturn=[this.list];
			this.list = new EmptyBlock(listVersionOf(this.paramType));
			return toReturn;
		}

		const indexRes=this.indexBlock.removeBlockAt(v, removeAfter);
		if (indexRes.length > 0) {
			return indexRes;
		}
		if (this.indexBlock.boundingBox.contains(v) && this.indexBlock.draggable()) {
			const toReturn=[this.indexBlock];
			this.indexBlock=new EmptyBlock('INT');
			return toReturn;
		}

		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.paramType);
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ff00cb';

		const perim: Array<Vec> = this.getPerim();
		ctx.beginPath();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}
		ctx.fill();

		ctx.fillStyle = '#000921';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const middleY=this.boundingBox.y + this.boundingBox.h/2;
		ctx.fillText(
			'at', 
			this.boundingBox.x + RAMP_WIDTH + this.list.boundingBox.w + GET_LIST_AT_AT_WIDTH/2,
			middleY
		);

	}

	getReturnType(): DataType {
		return this.paramType;
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.list = this.list.tryToPlace(v, blockToPlace, ctx) ?? this.list;
		this.indexBlock = this.indexBlock.tryToPlace(v, blockToPlace, ctx) ?? this.indexBlock;
		return null;
	}

	evaluate(): ?Value {
		const index = verifyInt(this.indexBlock.runEvaluate());
		const interpreter: InterpriterState = getInterpriterState();
		const expectedListType = listVersionOf(this.paramType);
		if (!(this.list instanceof GetVariableBlock)) {
			return defaultValueFor(this.paramType);
		}

		const listName = this.list.variableName;

		const list = interpreter.getVariable(expectedListType, listName);
		switch(this.paramType) {
			case 'INT':
				return verifyIntList(list).getAt(index);
			case 'BOOLEAN':
				return verifyBooleanList(list).getAt(index);
			case 'DOUBLE':
				return verifyDoubleList(list).getAt(index);
			default:
				return null;
		}
	}

}

export default GetListAtBlock;
