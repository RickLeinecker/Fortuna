//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import measureText from './measureText.js';
import Vec from './Vec.js';
import generateCornerPerim from './generateCornerPerim.js';
import {getInterpriterState} from '../interpreter/InterpriterState.js';
import InterpriterState from '../interpreter/InterpriterState.js';
import type {Value} from '../interpreter/Value.js';
import {isLegalConstant, getNameAsConstant} from '../userInteraction/defaultVariableNames.js';

import {
	RAMP_WIDTH, 
	EMPTY_STATEMENT_HEIGHT
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js'

class GetVariableBlock extends CasusBlock {

	variableName: string;
	_variableNameBoundingBox: BoundingBox;
	dataType: DataType;

	constructor(variableName: string, dataType: DataType) {
		super('GetVariableBlock');

		this.variableName = variableName;
		this._variableNameBoundingBox = measureText(variableName);
		this.dataType = dataType;
	}

	precompBounds(): void {
		this._variableNameBoundingBox = measureText(this.variableName);

		const width = RAMP_WIDTH + this._variableNameBoundingBox.w + RAMP_WIDTH;
		const height = EMPTY_STATEMENT_HEIGHT;

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
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	removeBlockAt(v: Vec, removeAfter: boolean, justReturnCopy: boolean): Array<CasusBlock> {
		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.dataType);
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

		ctx.fillText(
			this.variableName, 
			this.boundingBox.x + RAMP_WIDTH + this._variableNameBoundingBox.w/2,
			this.boundingBox.y + this.boundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return this.dataType;
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		return null;
	}

	evaluate(): ?Value {
		if (isLegalConstant(this.variableName, this.dataType)) {
			const toReturn = getNameAsConstant(this.variableName, this.dataType);
			return toReturn;
		}
		const interpreter: InterpriterState = getInterpriterState();
		return interpreter.getVariable(this.dataType, this.variableName);
	}

}

export default GetVariableBlock;
