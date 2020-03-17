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
import loadCasus from '../casus/loadCasus.js';
import TankPart from './TankPart.js';

function getTestTank(): Tank {
	const toReturn: Tank = new Tank(
		new Vec(20, -20), 
		'id',
		'tankName',
		false,
		new Chassis(),
		//Main Gun
		new Gun(),
		//secondary gun
		new Gun(),
		//Main Scanner
		new TankPart(),
		//Secondary Scanner
		new TankPart(),
		//Teritiary Scanner
		new TankPart(),
		//Jammer
		new TankPart(),
		new Treads(), 
		//First use item
		new TankPart(),
		//Second use item
		new TankPart(),
		//Third use item
		new TankPart(),		
		getTestCasusCode()
	);
	loadCasus(blocks => {toReturn.casusCode = blocks});
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
