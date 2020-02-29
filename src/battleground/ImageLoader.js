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
	DIRT_BACKGROUND: new Image()
};
const callbacksWhenLoaded: Array<()=>void> = [];

function imageLoaderInit() {
	if (initialized) {
		return;
	}
	initialized=true;

	//------------------ADD MORE IMAGE HERE---------------------------
	allImages.DIRT_BACKGROUND.src='DirtBackground.png';
	//------------------END ADD MORE IMAGE HERE-----------------------
	
	for (const name: ImageName of Object.keys(allImages)) {
		allImages[name].onload = _anotherImageLoaded;
	}
}

function _anotherImageLoaded() {
	for (const callback: () => void of callbacksWhenLoaded) {
		callback();
	}
}

function getImage(name: ImageName) {
	return allImages[name];
}

function addCallbackWhenImageLoaded(callback: () => void) {
	callbacksWhenLoaded.push(callback);
}

export {imageLoaderInit, getImage, addCallbackWhenImageLoaded};
