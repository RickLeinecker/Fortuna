//@flow strict

import type {ComponentType} from './ComponentType.js';
import {allComponents} from './ComponentType.js';

// Contains all components and their types.
// If a new one is to be added make sure it is under the correct type.
const allComponentTypes: {[ComponentType]: string} = {

	// Chassis
	"moddableLight": "chassis",
	"light": "chassis",
	"moddable": "chassis",
	"heavy": "chassis",
	"moddableHeavy": "chassis",

	// Weapons
	"machineGun": "weapon",
	"grenadeLauncher": "weapon",
	"missile": "weapon",
	"shotgun": "weapon",
	"vulcanCannon": "weapon",
	"laser": "weapon",
	"plasma": "weapon",
	"pulseLaser": "weapon",
	"lancer": "weapon",
	"deathRay": "weapon",

	// Scanners
	"shortRangeScanner": "scanner",
	"mediumRangeScanner": "scanner",
	"longRangeScanner": "scanner",
	"itemScanner": "scanner",
	"antiJammerScanner": "scanner",

	// Jammers
	"shortRangeJammer": "jammer",
	"mediumRangeJammer": "jammer",
	"longRangeJammer": "jammer",

	// Treads
	"advancedTreads": "treads",
	"fastTreads": "treads",
	"armoredTreads": "treads",
	"heavilyArmoredTreads": "treads",

	// Single-Use Items
	"mine": "item",
	"c4": "item",
	"nitroRepair": "item",
	"overdrive": "item",
	"missileTrackingBeacon": "item",
};

// Contains all components and their point values.
const allComponentPoints: {[ComponentType]: number} = {
	
	// Chassis
	"moddableLight": -1,
	"light": 0,
	"moddable": -1,
	"heavy": 0,
	"moddableHeavy": -1,

	// Weapons
	"machineGun": 1,
	"grenadeLauncher": 1,
	"missile": 1,
	"shotgun": 1,
	"vulcanCannon": 1,
	"laser": 1,
	"plasma": 2,
	"pulseLaser": 1,
	"lancer": 2,
	"deathRay": 2,

	// Scanners
	"shortRangeScanner": 1,
	"mediumRangeScanner": 2,
	"longRangeScanner": 3,
	"itemScanner": 1,
	"antiJammerScanner": 1,

	// Jammers
	"shortRangeJammer": 1,
	"mediumRangeJammer": 1,
	"longRangeJammer": 1,

	// Treads
	"advancedTreads": 2,
	"fastTreads": 1,
	"armoredTreads": 1,
	"heavilyArmoredTreads": 2,

	// Single-Use Items
	"mine": 1,
	"c4": 2,
	"nitroRepair": 1,
	"overdrive": 2,
	"missileTrackingBeacon": 2,
};

// Find a component's type.
function getComponentType(component: ComponentType): string {
	return allComponentTypes[component];
}

// Find a component's point value.
function getComponentPoints(component: ComponentType): number {
	return allComponentPoints[component];
}

// The next 6 functions parse through a players inventory and returns components of only a certain type.
function getChassis(inventory: Array<ComponentType>): Array<ComponentType> {
	
	let chassis: Array<ComponentType> = [];

	for(const component of inventory) {
		if(allComponentTypes[component] === "chassis") {
			chassis.push(component);
		}
	}

	return chassis;
}

function getWeapons(inventory: Array<ComponentType>): Array<ComponentType> {
	
	let weapons: Array<ComponentType> = [];

	for(const component of inventory) {
		if(allComponentTypes[component] === "weapon") {
			weapons.push(component);
		}
	}

	return weapons;
}

function getScanners(inventory: Array<ComponentType>): Array<ComponentType> {
	
	let scanners: Array<ComponentType> = [];

	for(const component of inventory) {
		if(allComponentTypes[component] === "scanner") {
			scanners.push(component);
		}
	}

	return scanners;
}

function getJammers(inventory: Array<ComponentType>): Array<ComponentType> {
	
	let jammers: Array<ComponentType> = [];

	for(const component of inventory) {
		if(allComponentTypes[component] === "jammer") {
			jammers.push(component);
		}
	}

	return jammers;
}

function getTreads(inventory: Array<ComponentType>): Array<ComponentType> {
	
	let treads: Array<ComponentType> = [];

	for(const component of inventory) {
		if(allComponentTypes[component] === "treads") {
			treads.push(component);
		}
	}

	return treads;
}

function getItems(inventory: Array<ComponentType>): Array<ComponentType> {
	
	let items: Array<ComponentType> = [];

	for(const component of inventory) {
		if(allComponentTypes[component] === "item") {
			items.push(component);
		}
	}

	return items;
}

function verifyComponent(comp: string): ComponentType {
	const matched=allComponents.filter(x => x === comp);
	if (matched.length === 1) {
		return matched[0];
	}

	throw new Error('Attempted to cast '+comp+' to a component when it isnt one!');
}

export {
	getComponentType, 
	getComponentPoints, 
	getChassis, 
	getWeapons, 
	getScanners, 
	getJammers, 
	getItems, 
	getTreads,
	verifyComponent
};
