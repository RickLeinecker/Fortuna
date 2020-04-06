//@flow strict

import BoundingBox from './BoundingBox.js';
import CasusBlock from './CasusBlock.js';
import {isDefaultVariableName} from '../userInteraction/defaultVariableNames.js';
import Vec from './Vec.js';
import measureText from './measureText.js';
import generateCornerPerim from './generateCornerPerim.js';
import {getInterpriterState} from '../interpreter/InterpriterState.js';
import DefineFunctionBlock from './DefineFunctionBlock.js';

import {
	RAMP_WIDTH, 
	VPADDING, 
	EMPTY_STATEMENT_HEIGHT,
} from './generateCornerPerim.js';

import type {DataType} from './DataType.js';

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

	removeBlockAt(v: Vec, removeAfter: boolean, justReturnCopy: boolean): Array<CasusBlock> {
		return [];
	}

	getPerim(): Array<Vec> {
		return generateCornerPerim(this.boundingBox, this.getReturnType()); 
	}

	getExistingVariableNames(dataType: DataType): Array<string> {
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

	evaluate(): null {
		const interpreterState = getInterpriterState();
		const toCall = interpreterState.getFunction(this.functionName);
		if (toCall == null || !(toCall instanceof DefineFunctionBlock)) {
			return null;
		}

		//Javascript has an embarassingly small stack size, so if we have infinite recursion,
		//that will be a problem. Therefore, we have to keep track of how deep on the stack
		//we are, so that we never crash the web browser.
		if (interpreterState.inTooDeep()) {
			//instead of going under again
			return null;
		}
		interpreterState.incrementRecursionDepth();
		toCall.contents.runEvaluate();
		interpreterState.decrementRecursionDepth();
		return null;
	}
}

export default CallFunctionBlock;
