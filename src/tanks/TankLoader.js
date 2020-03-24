//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';
import Chassis from './Chassis.js';
import Gun from './Gun.js';
import Item from './Item.js';
import Treads from './Treads.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';
import Scanner from './Scanner.js';
import Jammer from './Jammer.js';
import loadCasus from '../casus/loadCasus.js';
import { getComponentsOfType } from '../armory/GetInventoryInfo.js';

import type { TankComponent } from '../armory/TankComponent.js';

/* REMOVE ONCE GETTANK FUNCTION IS FULLY TESTED
function getTestTank(id: number=1): Tank {
	const position=id===1?new Vec(20, -20):new Vec(50, 40);
	const toReturn: Tank = new Tank(
		position,
		new Chassis(id===1?'CHASSIS_5':'CHASSIS_2'), 
		new Treads(id===1?'TREAD_2':'TREAD_1'), 
		new Gun(id===1?'GUN_10':'GUN_9'),
		new Scanner(false, false, id===1?'MEDIUM':'SMALL'),
		new Jammer(id===1?'MEDIUM':'LARGE'),
		getEmptyCasusCode()
	);
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}
*/

function getTank(tank: Object): Tank {
	// Setup TankComponent arrays.
	const position=tank._id===1?new Vec(20, -20):new Vec(50, 40);
	const chassis: Array<TankComponent> = getComponentsOfType(tank.components, 'chassis');
	const weapons: Array<TankComponent> = getComponentsOfType(tank.components, 'weapon');
	const scanners: Array<TankComponent> = getComponentsOfType(tank.components, 'scanner');
	const scannerAddons: Array<TankComponent> = getComponentsOfType(tank.components, 'scannerAddon');
	const jammers: Array<TankComponent> = getComponentsOfType(tank.components, 'jammer');
	const treads: Array<TankComponent> = getComponentsOfType(tank.components, 'treads');
	const items: Array<TankComponent> = getComponentsOfType(tank.components, 'item');
	
	// Setup return value.
	const toReturn: Tank = new Tank (
		position,
		new Chassis(chassis[0]),
		new Gun(weapons[0]),
		new Gun(weapons[1]),
		new Scanner(scanners[0], false, false),
		new Scanner(scannerAddons[0], false, false),
		new Scanner(scannerAddons[1], false, false),
		new Jammer(jammers[0]),
		new Treads(treads[0]),
		new Item(items[0]),
		new Item(items[1]),
		new Item(items[2]),
		getEmptyCasusCode(),
		tank.tankName,
		tank._id,
		tank.userId,
		tank.components,
	)
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}

function getEmptyCasusCode(): CasusBlock {
	const childrenBlocks: Array<CasusBlock> = [];
	const container: ContainerBlock = new ContainerBlock(childrenBlocks);
	return container;
}

export {getTank};
