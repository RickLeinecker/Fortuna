//@flow strict

import type {ImageName} from './ImageName.js';

// This is a static helper class for loading images
// to add more images, add their names to the allImages type
// and then add them to the allImages in the imageLoaderInit() function
//
// Usage:
// Call ImageLoaderInit() in the constructor/componentDidMount whenever
// you might need to get images and they will start loading
//

let initialized=false;
const allImages: {[ImageName]: Image}= {
	DIRT_BACKGROUND: new Image(),
	WALL: new Image(),

	C4: new Image(),
	MINE: new Image(),
	MINE_UNTRIGGERED: new Image(),

	EMBER1: new Image(),
	EMBER2: new Image(),
	SMOKE1: new Image(),
	SMOKE2: new Image(),
	SMOKE3: new Image(),
	ELECTRICITY: new Image(),
	ELECTRICITY_FLIPPED: new Image(),
	STATIC: new Image(),
	EMP: new Image(),
	GREEN_PARTICLE: new Image(),

	CHASSIS_1: new Image(),
	CHASSIS_2: new Image(),
	CHASSIS_3: new Image(),
	CHASSIS_4: new Image(),
	CHASSIS_5: new Image(),
	TREAD_1: new Image(),
	TREAD_2: new Image(),
	TREAD_3: new Image(),
	TREAD_4: new Image(),
	RED_GUN_1: new Image(),
	JAMMER_SMALL: new Image(),
	JAMMER_MEDIUM: new Image(),
	JAMMER_LARGE: new Image(),
	SCANNER_SMALL: new Image(),
	SCANNER_MEDIUM: new Image(),
	SCANNER_LARGE: new Image(),
	SCANNER_SMALL_ITEMS: new Image(),
	SCANNER_MEDIUM_ITEMS: new Image(),
	SCANNER_LARGE_ITEMS: new Image(),
	SCANNER_BUBBLE: new Image(),
};
const callbacksWhenLoaded: Array<()=>void> = [];

function imageLoaderInit(): void {
	if (initialized) {
		return;
	}
	initialized=true;

	//------------------ADD MORE IMAGE HERE---------------------------
	allImages.DIRT_BACKGROUND.src='DirtBackground.png';
	allImages.WALL.src='Wall.png';

	allImages.C4.src='c4.png';
	allImages.MINE.src='mine.png';
	allImages.MINE_UNTRIGGERED.src='mineUntriggered.png';

	allImages.EMBER1.src='Ember1.png';
	allImages.EMBER2.src='Ember2.png';
	allImages.SMOKE1.src='Smoke1.png';
	allImages.SMOKE2.src='Smoke2.png';
	allImages.SMOKE3.src='Smoke3.png';
	allImages.ELECTRICITY.src='Electricity.png';
	allImages.ELECTRICITY_FLIPPED.src='ElectricityFlipped.png';
	allImages.STATIC.src='static.png';
	allImages.EMP.src='EmpPulse.png';
	allImages.GREEN_PARTICLE.src='GreenParticle.png';

	allImages.CHASSIS_1.src='Chassis1Blue.png';
	allImages.CHASSIS_2.src='Chassis2.png';
	allImages.CHASSIS_3.src='Chassis3.png';
	allImages.CHASSIS_4.src='Chassis4.png';
	allImages.CHASSIS_5.src='Chassis5.png';
	allImages.TREAD_1.src='Tread1Gray.png';
	allImages.TREAD_2.src='Tread2.png';
	allImages.TREAD_3.src='Tread3.png';
	allImages.TREAD_4.src='Tread4.png';
	allImages.RED_GUN_1.src='gun1GrayRed.png';
	allImages.JAMMER_SMALL.src='JammerSmall.png';
	allImages.JAMMER_MEDIUM.src='JammerMedium.png';
	allImages.JAMMER_LARGE.src='JammerLarge.png';
	allImages.SCANNER_SMALL.src='scannerSmall.png';
	allImages.SCANNER_MEDIUM.src='MediumScanner.png';
	allImages.SCANNER_LARGE.src='LargeScanner.png';
	allImages.SCANNER_SMALL_ITEMS.src='scannerItemsSmall.png';
	allImages.SCANNER_MEDIUM_ITEMS.src='MediumItemsScanner.png';
	allImages.SCANNER_LARGE_ITEMS.src='LargeItemsScanner.png';
	allImages.SCANNER_BUBBLE.src='AntiJammerBubble.png';
	//------------------END ADD MORE IMAGE HERE-----------------------
	
	for (const name: ImageName of Object.keys(allImages)) {
		allImages[name].onload = _anotherImageLoaded;
	}
}

function _anotherImageLoaded(): void {
	for (const name: ImageName of Object.keys(allImages)) {
		if (!allImages[name].complete) {
			return;
		}
	}

	//otherwise all the images are loaded
	for (const callback: () => void of callbacksWhenLoaded) {
		callback();
	}
}

function getImage(name: ImageName): Image {
	return allImages[name];
}

function addCallbackWhenImageLoaded(callback: () => void): void {
	callbacksWhenLoaded.push(callback);
}

export {imageLoaderInit, getImage, addCallbackWhenImageLoaded};
