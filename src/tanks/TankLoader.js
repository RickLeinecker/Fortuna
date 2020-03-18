//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';
import Gun from './Gun.js';
import Treads from './Treads.js';
import SingleUseItem from './SingleUseItem.js';
import Jammer from './Jammer.js';
import Scanner from './Scanner.js';
import Chassis from './Chassis.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';
import SetVariableBlock from '../casus/blocks/SetVariableBlock.js';
import GetVariableBlock from '../casus/blocks/GetVariableBlock.js';
import loadCasus from '../casus/loadCasus.js';

function getTestTank(): Tank {
	const toReturn: Tank = new Tank(
		new Vec(20, -20), 
		'id',
		'tankName',
		false,
		//Chassis
		new Chassis("Test Chassis"),
		//Main Gun
		new Gun("Test Gun"),
		//secondary gun
		new Gun("Test Gun"),
		//Main Scanner
		new Scanner("Test Scanner"),
		//Secondary Scanner
		new Scanner("Test Scanner"),
		//Teritiary Scanner
		new Scanner("Test Scanner"),
		//Jammer
		new Jammer("Test Jammer"),
		//Threads
		new Treads("Test Threads"), 
		//First use item
		new SingleUseItem("Test First Item"),
		//Second use item
		new SingleUseItem("Test Second Item"),
		//Third use item
		new SingleUseItem("Test Third Item"),		
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
