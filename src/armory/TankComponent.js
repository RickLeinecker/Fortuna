//@flow strict

// Used to track objects that are to hold component names.
type TankComponent = 

	// Chassis
	'moddableLight' | 'light' |  'moddable' | 'heavy' | 'moddableHeavy' |

	// Weapons
	// First row is kinetic, second is heat
	'machineGun' | 'grenadeLauncher' | 'missile' | 'shotgun' | 'vulcanCannon' |
	'laser' | 'plasma' | 'pulseLaser' | 'lancer' | 'deathRay' |

	// Scanners
	// First row is scanners, second is add ons for the scanners.
	'shortRangeScanner' | 'mediumRangeScanner' | 'longRangeScanner' |
	'itemScanner' | 'antiJammerScanner' |

	// Jammers
	'shortRangeJammer' | 'mediumRangeJammer' | 'longRangeJammer' |

	// Treads
	'advancedTreads' | 'fastTreads' | 'armoredTreads' | 'heavilyArmoredTreads' |

	// Items
	'mine' | 'c4' | 'overdrive' | 'nitroRepair' | 'missileTrackingBeacon' 
;

const allComponents: Array<TankComponent> = [
	'moddableLight', 'light',  'moddable', 'heavy', 'moddableHeavy',

	'machineGun', 'grenadeLauncher', 'missile', 'shotgun', 'vulcanCannon',
	'laser', 'plasma', 'pulseLaser', 'lancer', 'deathRay',

	'shortRangeScanner', 'mediumRangeScanner', 'longRangeScanner',
	'itemScanner', 'antiJammerScanner',

	'shortRangeJammer', 'mediumRangeJammer', 'longRangeJammer',

	'advancedTreads', 'fastTreads', 'armoredTreads', 'heavilyArmoredTreads',

	'mine', 'c4', 'overdrive', 'nitroRepair', 'missileTrackingBeacon'
]

export type {TankComponent};

export {allComponents};
