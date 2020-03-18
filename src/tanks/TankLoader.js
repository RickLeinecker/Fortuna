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
import Scanner from './Scanner.js';
import Jammer from './Jammer.js';
import loadCasus from '../casus/loadCasus.js';

function getTestTank(id: number=1): Tank {
	const position=id===1?new Vec(20, -20):new Vec(50, 40);
	const toReturn: Tank = new Tank(
		position,
		new Chassis(), 
		new Treads(), 
		new Gun(),
		new Scanner(false, false, id===1?'MEDIUM':'SMALL'),
		new Jammer(id===1?'MEDIUM':'LARGE'),
		getEmptyCasusCode()
	);
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}

function getEmptyCasusCode(): CasusBlock {
	const childrenBlocks: Array<CasusBlock> = [];
	const container: ContainerBlock = new ContainerBlock(childrenBlocks);
	return container;
}

export {getTestTank};
