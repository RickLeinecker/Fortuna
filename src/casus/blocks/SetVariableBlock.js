//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import measureText from './measureText.js';
import Vec from './Vec.js';
import generateCornerPerim from './generateCornerPerim.js';
import InterpriterState from '../interpreter/InterpriterState.js'
import {getInterpriterState} from '../interpreter/InterpriterState.js'
import {
	isBuiltInVariable,
	isLegalConstant,
	isDefaultVariableName,
} from '../userInteraction/defaultVariableNames.js';

import {
	SET_VARIABLE_SET_WIDTH, 
	SET_VARIABLE_TO_WIDTH, 
	RAMP_WIDTH, 
	VPADDING
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js'

class SetVariableBlock extends CasusBlock {

	variableName: string;
	expressionBlock: CasusBlock;
	_variableNameBoundingBox: BoundingBox;
	paramType: DataType;

	constructor(variableName: string, paramType: DataType) {
		super('SetVariableBlock');

		this.variableName = variableName;
		this.expressionBlock = new EmptyBlock(paramType);
		this.paramType = paramType;
		this._variableNameBoundingBox = measureText(variableName);
	}

	precompBounds(): void {
		this.expressionBlock.precompBounds();
		this._variableNameBoundingBox = measureText(this.variableName);

		const width = RAMP_WIDTH + SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w + 
			SET_VARIABLE_TO_WIDTH + this.expressionBlock.boundingBox.w + RAMP_WIDTH;
		const height = VPADDING + this.expressionBlock.boundingBox.h + VPADDING;

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
		const expressionX = x + RAMP_WIDTH + SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w
			+ SET_VARIABLE_TO_WIDTH;
		const expressionY = y + VPADDING;

		this.expressionBlock.precompXY(expressionX, expressionY);
	}

	getChildBlocks(): Array<CasusBlock> {
		return [this.expressionBlock];
	}

	removeBlockAt(v: Vec, removeAfter: boolean, justReturnCopy: boolean): Array<CasusBlock> {
		const expressionRes=this.expressionBlock.removeBlockAt(v, removeAfter, justReturnCopy);
		if (expressionRes.length > 0) {
			return expressionRes;
		}
		if (this.expressionBlock.boundingBox.contains(v) && this.expressionBlock.draggable()) {
			const toReturn=[this.expressionBlock];
			if (!justReturnCopy) {
				this.expressionBlock=new EmptyBlock(this.paramType);
			}
			return toReturn;
		}
		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, 'VOID');
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		const builtInVariable = isBuiltInVariable(this.variableName, this.paramType);
		const legalConstant = isLegalConstant(this.variableName, this.paramType);
		if (builtInVariable) {
			ctx.fillStyle = '#3dc2dc';
		}
		else if (legalConstant) {
			ctx.fillStyle = '#aaaaaa';
		}
		else {
			ctx.fillStyle = '#ff00cb';
		}

		ctx.fillRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);

		ctx.fillStyle = '#000921';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText(
			'set', 
			this.boundingBox.x + RAMP_WIDTH + SET_VARIABLE_SET_WIDTH/2,
			this.boundingBox.y + this.boundingBox.h/2
		);
		ctx.fillText(
			this.variableName, 
			this.boundingBox.x + RAMP_WIDTH + SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w/2,
			this.boundingBox.y + this.boundingBox.h/2
		);
		ctx.fillText(
			'to', 
			this.boundingBox.x + RAMP_WIDTH + SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w +
				SET_VARIABLE_TO_WIDTH/2,
			this.boundingBox.y + this.boundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return 'VOID';
	}

	getExistingVariableNames(dataType: DataType): Array<string> {
		if (this.paramType !== dataType) {
			return [];
		}
		//if it is a constant or a built in variable, don't add it to the list
		const builtInVariable = isBuiltInVariable(this.variableName, this.paramType);
		const legalConstant = isLegalConstant(this.variableName, this.paramType);
		const isDefault = isDefaultVariableName(this.variableName);
		if (legalConstant || builtInVariable || isDefault) {
			return [];
		}
		return [this.variableName];
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		if (!this.boundingBox.contains(v)) {
			return null;
		}
		this.expressionBlock = this.expressionBlock.tryToPlace(v, blockToPlace, ctx) ?? this.expressionBlock;
		return null;
	}

	evaluate(): null {
		const interpreter : InterpriterState = getInterpriterState();
		const setTo = this.expressionBlock.runEvaluate();
		if (setTo == null) {
			throw new Error('Didnt expect expression block to return null!');
		}
		interpreter.setVariable(this.paramType, this.variableName, setTo);
		return null;
	}

}

export default SetVariableBlock;
