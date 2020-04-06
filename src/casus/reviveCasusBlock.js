//@flow strict

import CasusBlock from './blocks/CasusBlock.js';
import CallFunctionBlock from './blocks/CallFunctionBlock.js';
import ContainerBlock from './blocks/ContainerBlock.js';
import AndBlock from './blocks/AndBlock.js';
import DoubleAbsBlock from './blocks/DoubleAbsBlock.js';
import DoubleAddBlock from './blocks/DoubleAddBlock.js';
import DoubleDivideBlock from './blocks/DoubleDivideBlock.js';
import DoubleEqualsBlock from './blocks/DoubleEqualsBlock.js';
import DoubleGreaterThanBlock from './blocks/DoubleGreaterThanBlock.js';
import DoubleGreaterThanOrEqualBlock from './blocks/DoubleGreaterThanOrEqualBlock.js';
import DoubleLessThanBlock from './blocks/DoubleLessThanBlock.js';
import DoubleLessThanOrEqualBlock from './blocks/DoubleLessThanOrEqualBlock.js';
import DoubleMaxBlock from './blocks/DoubleMaxBlock.js';
import DoubleMinBlock from './blocks/DoubleMinBlock.js';
import DoubleMultiplyBlock from './blocks/DoubleMultiplyBlock.js';
import DoubleRoundBlock from './blocks/DoubleRoundBlock.js';
import DoubleSubtractBlock from './blocks/DoubleSubtractBlock.js';
import DoubleTruncateBlock from './blocks/DoubleTruncateBlock.js';
import DefineFunctionBlock from './blocks/DefineFunctionBlock.js';
import EmptyBlock from './blocks/EmptyBlock.js';
import ForBlock from './blocks/ForBlock.js';
import GetListAtBlock from './blocks/GetListAtBlock.js';
import GetVariableBlock from './blocks/GetVariableBlock.js';
import IfBlock from './blocks/IfBlock.js';
import IfElseBlock from './blocks/IfElseBlock.js';
import IntAbsBlock from './blocks/IntAbsBlock.js';
import IntAddBlock from './blocks/IntAddBlock.js';
import IntDivideBlock from './blocks/IntDivideBlock.js';
import IntEqualsBlock from './blocks/IntEqualsBlock.js';
import IntGreaterThanBlock from './blocks/IntGreaterThanBlock.js';
import IntGreaterThanOrEqualBlock from './blocks/IntGreaterThanOrEqualBlock.js';
import IntLessThanBlock from './blocks/IntLessThanBlock.js';
import IntLessThanOrEqualBlock from './blocks/IntLessThanOrEqualBlock.js';
import IntMaxBlock from './blocks/IntMaxBlock.js';
import IntMinBlock from './blocks/IntMinBlock.js';
import IntModuloBlock from './blocks/IntModuloBlock.js';
import IntMultiplyBlock from './blocks/IntMultiplyBlock.js';
import IntSubtractBlock from './blocks/IntSubtractBlock.js';
import IntToDoubleBlock from './blocks/IntToDoubleBlock.js';
import ListAppendBlock from './blocks/ListAppendBlock.js';
import ListSizeBlock from './blocks/ListSizeBlock.js';
import MathAcosBlock from './blocks/MathAcosBlock.js';
import MathAsinBlock from './blocks/MathAsinBlock.js';
import MathAtanBlock from './blocks/MathAtanBlock.js';
import MathCosBlock from './blocks/MathCosBlock.js';
import MathSinBlock from './blocks/MathSinBlock.js';
import MathSqrtBlock from './blocks/MathSqrtBlock.js';
import MathTanBlock from './blocks/MathTanBlock.js';
import MathPowBlock from './blocks/MathPowBlock.js';
import NotBlock from './blocks/NotBlock.js';
import OrBlock from './blocks/OrBlock.js';
import PrintBlock from './blocks/PrintBlock.js';
import SetListAtBlock from './blocks/SetListAtBlock.js';
import SetVariableBlock from './blocks/SetVariableBlock.js';
import WhileBlock from './blocks/WhileBlock.js';
import XorBlock from './blocks/XorBlock.js';

import type {BlockClass} from './blocks/BlockClass.js';
import type {DataType} from './blocks/DataType.js';

type SomeBlockFromServer = {
	blockClass: BlockClass,
	highlighted: boolean,
	blockClass: BlockClass,

	//and also a bunch of stuff that some blocks have that others don't:
	//binaryOperationBlock
	lChild: SomeBlockFromServer,
	rChild: SomeBlockFromServer,

	//conatinerBlock
	children: Array<SomeBlockFromServer>,

	//emptyBlock
	dataType: DataType,

	//forBlock
	initializationBlock: SomeBlockFromServer,
	expressionBlock: SomeBlockFromServer,
	incrementBlock: SomeBlockFromServer,
	contents: SomeBlockFromServer,

	//getListAtBlock
	list: SomeBlockFromServer,
	indexBlock: SomeBlockFromServer,
	paramType: DataType,

	//getVariableBlock
	variableName: string,
	//dataType: DataType, //shared with emptyBlock
	
	//singleConditionHeader
	conditionBlock: SomeBlockFromServer,
	//contents: SomeBlockFromServer, //shared with for block
	
	//ifElseBlock
	//conditionBlock: SomeBlockFromServer, //shared with singleConditionHeader
	ifContents: SomeBlockFromServer,
	elseContents: SomeBlockFromServer,

	//listSizeBlock
	//list: SomeBlockFromServer, //shared with getListAtBlock
	//paramType: DataType, shared with getListBlockAt	
	
	//setVariableBlock
	//variableName: string, //shared with getVariableBlock
	//paramType: DataType, //shared with getListAsBlock
	//expressionBlock: SomeBlockFromServer, //shared with forBlock
	
	//setListAtBlock
	//list: SomeBlockFromServer, //shared with getListAtBlock
	//indexBlock: SomeBlockFromServer, //shared with getListAtBlock
	//expressionBlock: SomeBlockFromServer, //shared with forBlock
	//paramType: DataType, //sharedWith getListAtBlock
	
	//callFunctionBlock
	functionName: string,
	
	//defineFunctionBlock
	//functionName: string
	expanded: boolean,
};

function verifyContainerBlock(block: CasusBlock): ContainerBlock {
	if (!(block instanceof ContainerBlock)) {
		throw new Error('Expected a casus container, but got something else!');
	}
	return block;
}

function reviveAsContainer(orig: SomeBlockFromServer): ContainerBlock {
	return verifyContainerBlock(reviveCasusBlock(orig));
}

// Okay, so why do we need this monstrosity?
// Well, JSON only stores fields (and not functions). There are hacks to get around that, but in short
// they don't work. Either, it makes it so we would never be able to change how casus blocks execute,
// (since the front-end code would be stored in our database), or it doesn't work correctly with Webpack imports.
//
// So, the solution is to 'revive' the objects that we get back as JSON. Since we store the type in the blockClass
// field, we can see what CasusBlock we need to turn it into. This is important/necessary because different
// casus blocks need to have different evaluate() functions; the AndBlock has to act very differently from a IntAddBlock
// when it is executed, even though the structure of the blocks is basically identical.
//
function reviveCasusBlock(orig: SomeBlockFromServer): CasusBlock {
	let toReturn: CasusBlock = new EmptyBlock('VOID');
	let dataType: DataType = 'VOID';
	let paramType: DataType = 'VOID';
	let variableName: string = 'ErrorReadingSavedData';
	switch(orig.blockClass) {
		case 'AndBlock':
			toReturn=new AndBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'CallFunctionBlock':
			toReturn=new CallFunctionBlock(orig.functionName);
			return toReturn;
		case 'ContainerBlock':
			const children=orig.children.map(child => reviveCasusBlock(child));
			toReturn=new ContainerBlock(children);
			return toReturn;
		case 'DoubleAbsBlock':
			toReturn=new DoubleAbsBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleAddBlock':
			toReturn=new DoubleAddBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleDivideBlock':
			toReturn=new DoubleDivideBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleEqualsBlock':
			toReturn=new DoubleEqualsBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleGreaterThanBlock':
			toReturn=new DoubleGreaterThanBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleGreaterThanOrEqualBlock':
			toReturn=new DoubleGreaterThanOrEqualBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleLessThanBlock':
			toReturn=new DoubleLessThanBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleLessThanOrEqualBlock':
			toReturn=new DoubleLessThanOrEqualBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleMaxBlock':
			toReturn=new DoubleMaxBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleMinBlock':
			toReturn=new DoubleMinBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleMultiplyBlock':
			toReturn=new DoubleMultiplyBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleRoundBlock':
			toReturn=new DoubleRoundBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleSubtractBlock':
			toReturn=new DoubleSubtractBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DoubleTruncateBlock':
			toReturn=new DoubleTruncateBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'DefineFunctionBlock':
			toReturn=new DefineFunctionBlock(orig.functionName, orig.expanded);
			toReturn.contents=verifyContainerBlock(reviveCasusBlock(orig.contents));
			return toReturn;
		case 'EmptyBlock':
			dataType=orig.dataType;
			toReturn=new EmptyBlock(dataType);
			return toReturn;
		case 'ForBlock':
			toReturn=new ForBlock();
			toReturn.initializationBlock=reviveCasusBlock(orig.initializationBlock);
			toReturn.expressionBlock=reviveCasusBlock(orig.expressionBlock);
			toReturn.incrementBlock=reviveCasusBlock(orig.incrementBlock);
			toReturn.contents=verifyContainerBlock(reviveCasusBlock(orig.contents));
			return toReturn;
		case 'GetListAtBlock':
			paramType=orig.paramType;
			toReturn=new GetListAtBlock(paramType);
			toReturn.list=reviveCasusBlock(orig.list);
			toReturn.indexBlock=reviveCasusBlock(orig.indexBlock);
			return toReturn;
		case 'GetVariableBlock':
			dataType=orig.dataType;
			variableName=orig.variableName;
			toReturn=new GetVariableBlock(variableName, dataType);
			return toReturn;
		case 'IfBlock':
			toReturn=new IfBlock();
			toReturn.conditionBlock=reviveCasusBlock(orig.conditionBlock);
			toReturn.contents=verifyContainerBlock(reviveCasusBlock(orig.contents));
			return toReturn;
		case 'IfElseBlock':
			toReturn=new IfElseBlock();
			toReturn.conditionBlock=reviveCasusBlock(orig.conditionBlock);
			toReturn.ifContents=verifyContainerBlock(reviveCasusBlock(orig.ifContents));
			toReturn.elseContents=verifyContainerBlock(reviveCasusBlock(orig.elseContents));
			return toReturn;
		case 'IntAbsBlock':
			toReturn=new IntAbsBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntAddBlock':
			toReturn=new IntAddBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntDivideBlock':
			toReturn=new IntDivideBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntEqualsBlock':
			toReturn=new IntEqualsBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntGreaterThanBlock':
			toReturn=new IntGreaterThanBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntGreaterThanOrEqualBlock':
			toReturn=new IntGreaterThanOrEqualBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntLessThanBlock':
			toReturn=new IntLessThanBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntLessThanOrEqualBlock':
			toReturn=new IntLessThanOrEqualBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntMaxBlock':
			toReturn=new IntMaxBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntMinBlock':
			toReturn=new IntMinBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntModuloBlock':
			toReturn=new IntModuloBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntMultiplyBlock':
			toReturn=new IntMultiplyBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntSubtractBlock':
			toReturn=new IntSubtractBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'IntToDoubleBlock':
			toReturn=new IntToDoubleBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'ListAppendBlock':
			dataType=orig.dataType;
			toReturn=new ListAppendBlock(dataType);
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'ListSizeBlock':
			paramType=orig.paramType;
			toReturn=new ListSizeBlock(paramType);
			toReturn.list=reviveCasusBlock(orig.list);
			return toReturn;
		case 'MathAcosBlock':
			toReturn=new MathAcosBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathAsinBlock':
			toReturn=new MathAsinBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathAtanBlock':
			toReturn=new MathAtanBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathCosBlock':
			toReturn=new MathCosBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathPowBlock':
			toReturn=new MathPowBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathSinBlock':
			toReturn=new MathSinBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathSqrtBlock':
			toReturn=new MathSqrtBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'MathTanBlock':
			toReturn=new MathTanBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'NotBlock':
			toReturn=new NotBlock();
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'OrBlock':
			toReturn=new OrBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'PrintBlock':
			paramType=orig.paramType;
			toReturn=new PrintBlock(paramType);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		case 'SetListAtBlock':
			paramType=orig.paramType;
			toReturn=new SetListAtBlock(paramType);
			toReturn.list=reviveCasusBlock(orig.list);
			toReturn.indexBlock=reviveCasusBlock(orig.indexBlock);
			toReturn.expressionBlock=reviveCasusBlock(orig.expressionBlock);
			return toReturn;
		case 'SetVariableBlock':
			variableName=orig.variableName;
			paramType=orig.paramType;
			toReturn=new SetVariableBlock(variableName, paramType);
			toReturn.expressionBlock=reviveCasusBlock(orig.expressionBlock);
			return toReturn;
		case 'WhileBlock':
			toReturn=new WhileBlock();
			toReturn.conditionBlock=reviveCasusBlock(orig.conditionBlock);
			toReturn.contents=verifyContainerBlock(reviveCasusBlock(orig.contents));
			return toReturn;
		case 'XorBlock':
			toReturn=new XorBlock();
			toReturn.lChild=reviveCasusBlock(orig.lChild);
			toReturn.rChild=reviveCasusBlock(orig.rChild);
			return toReturn;
		default:
			console.log('Found unexpected type when reviving Casus blocks!');
			console.log(orig.blockClass);
			return new ContainerBlock();
	}
}

export {reviveAsContainer};
export default reviveCasusBlock;
