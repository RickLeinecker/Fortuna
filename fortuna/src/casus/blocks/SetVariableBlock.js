//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import measureText from './measureText.js';

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

	constructor(variableName: string, paramType: DataType) {
		super();

		this.variableName = variableName;
		this.expressionBlock = new EmptyBlock(paramType);
		this._variableNameBoundingBox = measureText(variableName);
	}

	precompBounds(): void {
		this.expressionBlock.precompBounds();

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

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ee22aa';

		ctx.fillRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);

		ctx.fillStyle = '#000000';
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

}

export default SetVariableBlock;
