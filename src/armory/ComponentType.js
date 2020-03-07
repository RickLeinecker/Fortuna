//@flow strict

// Used to track objects that are to hold component names.
type ComponentType = 

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

export type {ComponentType};
