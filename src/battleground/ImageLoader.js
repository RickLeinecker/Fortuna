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
	SHADOW: new Image(),
	WALL: new Image(),

	C4: new Image(),
	MINE: new Image(),
	MINE_UNTRIGGERED: new Image(),
	MISSILE_TRACKER_DART: new Image(),
	MISSILE_TRACKER_TARGET: new Image(),

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

	DEATH_RAY_BULLET: new Image(),
	GREEN_LASER: new Image(),
	GRENADE_BULLET: new Image(),
	GUN_BULLET: new Image(),
	RED_LASER: new Image(),
	MISSILE: new Image(),
	PLASMA_BLOB: new Image(),
	PULSE_LASER_PARTICLE: new Image(),
	SHOTGUN_BULLET: new Image(),

	CHASSIS_1: new Image(),
	CHASSIS_2: new Image(),
	CHASSIS_3: new Image(),
	CHASSIS_4: new Image(),
	CHASSIS_5: new Image(),
	TREAD_1: new Image(),
	TREAD_2: new Image(),
	TREAD_3: new Image(),
	TREAD_4: new Image(),
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
	GUN_1: new Image(),
	GUN_2: new Image(),
	GUN_3: new Image(),
	GUN_4: new Image(),
	GUN_5: new Image(),
	GUN_6: new Image(),
	GUN_7: new Image(),
	GUN_8: new Image(),
	GUN_9: new Image(),
	GUN_10: new Image(),
};
const callbacksWhenLoaded: Array<()=>void> = [];

function imageLoaderInit(): void {
	if (initialized) {
		return;
	}
	initialized=true;

	//------------------ADD MORE IMAGE HERE---------------------------
	allImages.DIRT_BACKGROUND.src='DirtBackground.png';
	allImages.SHADOW.src='Shadow.png';
	allImages.WALL.src='Wall.png';

	allImages.C4.src='c4.png';
	allImages.MINE.src='mine.png';
	allImages.MINE_UNTRIGGERED.src='mineUntriggered.png';
	allImages.MISSILE_TRACKER_DART.src='MissileTrackingDart.png';
	allImages.MISSILE_TRACKER_TARGET.src='MissileTrackingTarget.png';

	allImages.EMBER1.src='Ember1.png';
	allImages.EMBER2.src='Ember2.png';
	allImages.SMOKE1.src='Smoke1.png';
	allImages.SMOKE2.src='Smoke2.png';
	allImages.SMOKE3.src='smoke3.png';
	allImages.ELECTRICITY.src='Electricity.png';
	allImages.ELECTRICITY_FLIPPED.src='ElectricityFlipped.png';
	allImages.STATIC.src='static.png';
	allImages.EMP.src='EmpPulse.png';
	allImages.GREEN_PARTICLE.src='GreenParticle.png';

	allImages.DEATH_RAY_BULLET.src='DeathRay.png';
	allImages.GREEN_LASER.src='GreenLaser1.png';
	allImages.GRENADE_BULLET.src='Grenade.png';
	allImages.GUN_BULLET.src='GunBullet.png';
	allImages.RED_LASER.src='LaserRed.png';
	allImages.MISSILE.src='Missile.png';
	allImages.PLASMA_BLOB.src='PlasmaBlob.png';
	allImages.PULSE_LASER_PARTICLE.src='PulseLaserParticle.png';
	allImages.SHOTGUN_BULLET.src='shotgunBullet.png';

	allImages.CHASSIS_1.src='Chassis1Blue.png';
	allImages.CHASSIS_2.src='Chassis2.png';
	allImages.CHASSIS_3.src='Chassis3.png';
	allImages.CHASSIS_4.src='Chassis4.png';
	allImages.CHASSIS_5.src='Chassis5.png';
	allImages.TREAD_1.src='Tread1Gray.png';
	allImages.TREAD_2.src='Tread2.png';
	allImages.TREAD_3.src='Tread3.png';
	allImages.TREAD_4.src='Tread4.png';
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
	allImages.GUN_1.src='gun1.png';
	allImages.GUN_2.src='Gun2.png';
	allImages.GUN_3.src='gun3.png';
	allImages.GUN_4.src='gun4.png';
	allImages.GUN_5.src='gun5.png';
	allImages.GUN_6.src='gun6.png';
	allImages.GUN_7.src='gun7.png';
	allImages.GUN_8.src='gun8.png';
	allImages.GUN_9.src='gun9.png';
	allImages.GUN_10.src='Gun10.png';
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
	if (name==null) {
		throw new Error('Tried to load an imageName: null!');
	}
	return allImages[name];
}

function addCallbackWhenImageLoaded(callback: () => void): void {
	callbacksWhenLoaded.push(callback);
}

export {imageLoaderInit, getImage, addCallbackWhenImageLoaded};
