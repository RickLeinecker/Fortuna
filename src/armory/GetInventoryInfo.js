//@flow strict

import type { TankComponent } from './TankComponent.js';
import type { ComponentType } from './ComponentType.js';
import { allComponents } from './TankComponent.js';
import Component from './Component.js';

// Contains all components and their types.
// If a new one is to be added make sure it is under the correct type.
const allComponentTypes: {[TankComponent]: ComponentType} = {

	// Chassis
	moddableLight: "chassis",
	light: "chassis",
	moddable: "chassis",
	heavy: "chassis",
	moddableHeavy: "chassis",

	// Weapons
	machineGun: "weapon",
	grenadeLauncher: "weapon",
	missile: "weapon",
	shotgun: "weapon",
	vulcanCannon: "weapon",
	laser: "weapon",
	plasma: "weapon",
	pulseLaser: "weapon",
	lancer: "weapon",
	deathRay: "weapon",

	// Scanners
	shortRangeScanner: "scanner",
	mediumRangeScanner: "scanner",
	longRangeScanner: "scanner",

	// Scanner Addons
	itemScanner: "scannerAddon",
	antiJammerScanner: "scannerAddon",

	// Jammers
	shortRangeJammer: "jammer",
	mediumRangeJammer: "jammer",
	longRangeJammer: "jammer",

	// Treads
	advancedTreads: "treads",
	fastTreads: "treads",
	armoredTreads: "treads",
	heavilyArmoredTreads: "treads",

	// Single-Use Items
	mine: "item",
	c4: "item",
	nitroRepair: "item",
	overdrive: "item",
	missileTrackingBeacon: "item",
};

// Contains all components and their point values.
const allComponentPoints: {[TankComponent]: number} = {
	
	// Chassis
	moddableLight: -1,
	light: 0,
	moddable: -1,
	heavy: 0,
	moddableHeavy: -1,

	// Weapons
	machineGun: 1,
	grenadeLauncher: 1,
	missile: 1,
	shotgun: 1,
	vulcanCannon: 1,
	laser: 1,
	plasma: 2,
	pulseLaser: 1,
	lancer: 2,
	deathRay: 2,

	// Scanners
	shortRangeScanner: 1,
	mediumRangeScanner: 2,
	longRangeScanner: 3,
	itemScanner: 1,
	antiJammerScanner: 1,

	// Jammers
	shortRangeJammer: 1,
	mediumRangeJammer: 1,
	longRangeJammer: 1,

	// Treads
	advancedTreads: 2,
	fastTreads: 1,
	armoredTreads: 1,
	heavilyArmoredTreads: 2,

	// Single-Use Items
	mine: 1,
	c4: 2,
	nitroRepair: 1,
	overdrive: 2,
	missileTrackingBeacon: 2,

	// Empty
	empty: 0,
};

type InventoryType = {[TankComponent]: number};

// Find a component's type.
function getComponentType(component: TankComponent): string {
	return allComponentTypes[component];
}

// Find a component's point value.
function getComponentPoints(component: TankComponent): number {
	return allComponentPoints[component];
}

// The parses through an inventory and returns components of a type.
function getComponentsOfType(inventory: Array<TankComponent>, type: ComponentType): Array<TankComponent> {
	return inventory.filter(comp => allComponentTypes[comp] === type);
}

// Verifies that a string is a component.
function verifyComponent(comp: string): TankComponent {
	const matched = allComponents.filter(x => x === comp);
	if (matched.length === 1) {
		return matched[0];
	}
	throw new Error('Attempted to cast '+comp+' to a component when it isnt one!');
}

// Converts back end inventory into a frontend array of components.
// The optional second parameter is used for returning a specific type of component.
function getInventory(inventory: InventoryType, type?: ComponentType): Array<Component> {
	const newInventory: Array<Component> = [];
	if(type !== null) {
		for(const componentString in inventory) {
			// Change the component string to a tank component.
			const component: TankComponent = verifyComponent(componentString);

			// Push new components onto the new inventory if they have the correct type and do not equal 0.
			if (allComponentTypes[component] === type && inventory[component] !== 0) {
				newInventory.push(new Component(component, inventory[component]));
			}
		}
	}
	else {
		for(const componentString in inventory) {
			// Change the string to a tank component and push onto the newInventory.
			const component: TankComponent = verifyComponent(componentString);
			newInventory.push(new Component(component, inventory[component]));
		}
	}

	return newInventory;
}

export {
	getComponentType,
	getComponentsOfType,
	getComponentPoints,
	verifyComponent,
	getInventory,
};
