//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';
import Chassis from './Chassis.js';
import Gun from './Gun.js';
import Treads from './Treads.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';
import Scanner from './Scanner.js';
import Jammer from './Jammer.js';
import TankPart from './TankPart.js';
import loadCasus from '../casus/loadCasus.js';
import BackendTank from './BackendTank.js';
import type { TankComponent } from '../armory/TankComponent.js';

function getTestTank(id: number=1): Tank {
	const position=id===1?new Vec(-80, -40):new Vec(50, 40);
	const toReturn: Tank = new Tank(
		position,
		new Chassis(id===1?'moddableLight':'heavy'),  
		new Gun(id===1?'laser':'plasma', false),
		new Gun(id===1?'missile':'pulseLaser', true),
		new Scanner(id===1?'longRangeScanner':'shortRangeScanner', false, false),
		new TankPart('empty'),
		new TankPart('empty'),
		new Jammer(id===1?'mediumRangeJammer':'longRangeJammer'),
		new Treads(id===1?'advancedTreads':'heavilyArmoredTreads'),
		new TankPart('empty'),
		new TankPart('empty'),
		new TankPart('empty'),
		getEmptyCasusCode(),
		id===1?'TestTank1':'TestTank2',
		'',
		'',
	);
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}

function getTank(tank: BackendTank): Tank {
	// Setup TankComponent arrays.
	const position = new Vec(50, 40);
	const chassis: TankComponent = tank.components[0];
	const weapons: Array<TankComponent> = [tank.components[1], tank.components[2]];
	const scanners: TankComponent = tank.components[3];
	const scannerAddons: Array<TankComponent> = [tank.components[4], tank.components[5]];
	const jammers: TankComponent = tank.components[6];
	const treads: TankComponent = tank.components[7];
	const items: Array<TankComponent> = [tank.components[8], tank.components[9], tank.components[10]];
	
	// Setup return value.
	const toReturn: Tank = new Tank (
		position,
		new Chassis(chassis),
		new Gun(weapons[0], false),
		new Gun(weapons[1], true),
		new Scanner(
			scanners, 
			(scannerAddons.includes('itemScanner')) ? true : false,
			(scannerAddons.includes('antiJammerScanner')) ? true : false,
		),
		new TankPart(scannerAddons[0]),
		new TankPart(scannerAddons[1]),
		new Jammer(jammers),
		new Treads(treads),
		new TankPart(items[0]),
		new TankPart(items[1]),
		new TankPart(items[2]),
		getEmptyCasusCode(),
		tank.tankName,
		tank._id,
		tank.userId,
	)
	loadCasus(blocks => {toReturn.casusCode = blocks}, tank._id);
	return toReturn;
}

function cloneTank(tank: Tank): Tank {

	const toReturn: Tank = new Tank (
		tank.position,
		tank.chassis,
		tank.mainGun,
		tank.secondaryGun,
		tank.scanner,
		tank.scannerAddonOne,
		tank.scannerAddonTwo,
		tank.jammer,
		tank.treads,
		tank.itemOne,
		tank.itemTwo,
		tank.itemThree,
		tank.casusCode,
		tank.tankName,
		tank._id,
		tank.userId,
	)
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}

function getEmptyCasusCode(): CasusBlock {
	const childrenBlocks: Array<CasusBlock> = [];
	const container: ContainerBlock = new ContainerBlock(childrenBlocks);
	return container;
}

export { getTank, getTestTank, cloneTank, getEmptyCasusCode };
