//@flow strict

type ImageName = 
	//general
	'DIRT_BACKGROUND' | 
	'WALL' | 

	//deployables
	'C4' |
	'MINE' |
	'MINE_UNTRIGGERED' |

	//particles
	'EMBER1' |
	'EMBER2' |
	'SMOKE1' |
	'SMOKE2' |
	'SMOKE3' |
	'ELECTRICITY' |
	'ELECTRICITY_FLIPPED' |
	'STATIC' |
	'EMP' |
	'GREEN_PARTICLE' |

	//tank stuff
	'BLUE_CHASSIS_1' | 
	'RED_GUN_1' | 
	'GRAY_TREAD_1' | 
	'JAMMER_SMALL' |
	'JAMMER_MEDIUM' |
	'JAMMER_LARGE' |
	'SCANNER_SMALL' |
	'SCANNER_MEDIUM' |
	'SCANNER_LARGE' |
	'SCANNER_SMALL_ITEMS' |
	'SCANNER_MEDIUM_ITEMS' |
	'SCANNER_LARGE_ITEMS' |
	'SCANNER_BUBBLE';

export type {ImageName};
