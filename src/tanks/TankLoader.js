//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';
import Chassis from './Chassis.js';
import Gun from './Gun.js';
import Treads from './Treads.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';
import SetVariableBlock from '../casus/blocks/SetVariableBlock.js';
import GetVariableBlock from '../casus/blocks/GetVariableBlock.js';

function getTestTank(): Tank {
	const toReturn: Tank = new Tank(
		new Vec(50, 20), 
		new Chassis(), 
		new Treads(), 
		new Gun(),
		getTestCasusCode()
	);
	return toReturn;
}

function getTestCasusCode(): CasusBlock {
	const setVariableBlock = new SetVariableBlock('forwardMovement', 'DOUBLE');
	setVariableBlock.expressionBlock = new GetVariableBlock('1', 'DOUBLE');
	
	const childrenBlocks: Array<CasusBlock> = [setVariableBlock];
	const container: ContainerBlock = new ContainerBlock(childrenBlocks);
	return container;
}

export {getTestTank};