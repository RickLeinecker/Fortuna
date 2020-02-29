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
	BLUE_CHASSIS_1: new Image(),
	RED_GUN_1: new Image(),
	GREY_TREAD_1: new Image()
};
const callbacksWhenLoaded: Array<()=>void> = [];

function imageLoaderInit(): void {
	if (initialized) {
		return;
	}
	initialized=true;

	//------------------ADD MORE IMAGE HERE---------------------------
	allImages.DIRT_BACKGROUND.src='DirtBackground.png';
	allImages.BLUE_CHASSIS_1.src='Chassis1Blue.png';
	allImages.RED_GUN_1.src='gun1GrayRed.png';
	allImages.GREY_TREAD_1.src='Tread1Gray.png';
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
