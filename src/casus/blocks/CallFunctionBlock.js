//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import EmptyBlock from './EmptyBlock.js';
import {isDefaultVariableName} from '../userInteraction/defaultVariableNames.js';
import Vec from './Vec.js';
import measureText from './measureText.js';
import generateCornerPerim from './generateCornerPerim.js';

import {
	CENTER_WIDTH, 
	RAMP_WIDTH, 
	VPADDING, 
	EMPTY_STATEMENT_HEIGHT,
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js';
import type {BlockClass} from './BlockClass.js';

class CallFunctionBlock extends CasusBlock {

	prefixName: string;
	functionName: string;

	constructor(functionName: string) {
		super('CallFunctionBlock');
		this.prefixName = 'Call ';
		this.functionName = functionName;
	}

	precompBounds(): void {
		const textWidth=measureText(this.prefixName + this.functionName).w;
		this.boundingBox=new BoundingBox(
			0, 
			0, 
			RAMP_WIDTH + textWidth + RAMP_WIDTH, 
			VPADDING +  EMPTY_STATEMENT_HEIGHT + VPADDING
		);	
	}

	precompXY(x: number, y:number): void {
		this.boundingBox.x=x;
		this.boundingBox.y=y;
	}

	getChildBlocks(): Array<CasusBlock> {
		return [];
	}

	removeBlockAt(v: Vec, removeAfter: boolean): Array<CasusBlock> {
		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.getReturnType()); 
	}

	getExistingVariableNames(dataType: DataType): Array<String> {
		if (dataType === 'VOID' && !isDefaultVariableName(this.functionName)) {
			return [this.functionName];
		}
		return [];
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#222233';
		const textWidth=measureText(this.prefixName + this.functionName).w;

		const perim: Array<Vec> = this.getPerim();
		ctx.beginPath();
		ctx.moveTo(perim[0].x, perim[0].y);
		for (const p of perim) {
			ctx.lineTo(p.x, p.y);
		}
		ctx.fill();

		ctx.fillStyle = '#047acc';
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText(
			this.prefixName + this.functionName, 
			this.boundingBox.x + RAMP_WIDTH + textWidth/2, 
			this.boundingBox.y + this.boundingBox.h/2
		);
	}

	getReturnType(): DataType {
		return 'VOID';
	}

	tryToPlace(v: Vec, blockToPlace: CasusBlock, ctx: ?CanvasRenderingContext2D): ?CasusBlock {
		return null;
	}

	//TODO: evaluate()
}

export default CallFunctionBlock;
