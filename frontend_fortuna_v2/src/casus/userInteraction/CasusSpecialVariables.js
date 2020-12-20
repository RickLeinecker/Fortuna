//@flow strict

// this file contains a list of all casus special variables names and their associated types

// ints

// booleans
const USE_MINE_VAR_NAME: string = 'useMine';
const USE_C4_VAR_NAME: string = 'useC4';
const RAN_INTO_WALL_VAR_NAME: string = 'ranIntoWall';
const USE_JAMMER_VAR_NAME: string = 'useJammer';
const USE_NITRO_REPAIR_VAR_NAME: string = 'useNitroRepair';
const SHOOT_PRIMARY_WEAPON_VAR_NAME: string = 'shootPrimaryWeapon';
const SHOOT_SECONDARY_WEAPON_VAR_NAME: string = 'shootSecondaryWeapon';
const USE_OVERDRIVE_VAR_NAME: string = 'useOverdrive';
const USE_MISSILE_TRACKER_VAR_NAME: string = 'useMissileTracker';

// doubles:
const FORWARD_MOVEMENT_VAR_NAME: string = 'forwardMovement';
const TARGET_DIRECTION_VAR_NAME: string = 'targetDirection';
const TURRET_DIRECTION_VAR_NAME: string = 'turretDirection';
const TANK_X_VAR_NAME: string = 'tankX';
const TANK_Y_VAR_NAME: string = 'tankY';
const TANK_HEALTH_VAR_NAME: string = 'tankHealth';

//double lists
const ENEMY_TANK_XS_VAR_NAME: string = 'enemyTankXs';
const ENEMY_TANK_YS_VAR_NAME: string = 'enemyTankYs';
const ENEMY_TANK_HEALTH_VAR_NAME: string = 'enemyTanksHealth';
const TEAM_TANK_XS_VAR_NAME: string = 'friendlyTankXs';
const TEAM_TANK_YS_VAR_NAME: string = 'friendlyTankYs';
const TEAM_TANK_HEALTH_VAR_NAME: string = 'friendlyTanksHealth';
const EXPLOSIVE_XS_VAR_NAME: string = 'explosiveXs';
const EXPLOSIVE_YS_VAR_NAME: string = 'explosiveYs';
const WALL_XS_VAR_NAME: string = 'wallXs';
const WALL_YS_VAR_NAME: string = 'wallYs';

const builtInIntVariables: Array<string> = [
];

const builtInBooleanVariables: Array<string> = [
	USE_MINE_VAR_NAME,
	USE_C4_VAR_NAME,
	RAN_INTO_WALL_VAR_NAME,
	USE_JAMMER_VAR_NAME,
	USE_NITRO_REPAIR_VAR_NAME,
	SHOOT_PRIMARY_WEAPON_VAR_NAME,
	SHOOT_SECONDARY_WEAPON_VAR_NAME,
	USE_OVERDRIVE_VAR_NAME,
	USE_MISSILE_TRACKER_VAR_NAME,
];

const builtInDoubleVariables: Array<string> = [
	FORWARD_MOVEMENT_VAR_NAME,
	TARGET_DIRECTION_VAR_NAME,
	TURRET_DIRECTION_VAR_NAME,
	TANK_X_VAR_NAME,
	TANK_Y_VAR_NAME,
	TANK_HEALTH_VAR_NAME,
];

const builtInDoubleListVariables: Array<string> = [
	ENEMY_TANK_XS_VAR_NAME,
	ENEMY_TANK_YS_VAR_NAME,
	ENEMY_TANK_HEALTH_VAR_NAME,
	TEAM_TANK_XS_VAR_NAME,
	TEAM_TANK_YS_VAR_NAME,
	TEAM_TANK_HEALTH_VAR_NAME,
	EXPLOSIVE_XS_VAR_NAME,
	EXPLOSIVE_YS_VAR_NAME,
	WALL_XS_VAR_NAME,
	WALL_YS_VAR_NAME,
];

export {
	USE_MINE_VAR_NAME,
	USE_C4_VAR_NAME,
	RAN_INTO_WALL_VAR_NAME,
	USE_JAMMER_VAR_NAME,
	USE_NITRO_REPAIR_VAR_NAME,
	SHOOT_PRIMARY_WEAPON_VAR_NAME,
	SHOOT_SECONDARY_WEAPON_VAR_NAME,
	USE_OVERDRIVE_VAR_NAME,
	USE_MISSILE_TRACKER_VAR_NAME,

	FORWARD_MOVEMENT_VAR_NAME,
	TARGET_DIRECTION_VAR_NAME,
	TURRET_DIRECTION_VAR_NAME,
	TANK_X_VAR_NAME,
	TANK_Y_VAR_NAME,
	TANK_HEALTH_VAR_NAME,

	ENEMY_TANK_XS_VAR_NAME,
	ENEMY_TANK_YS_VAR_NAME,
	ENEMY_TANK_HEALTH_VAR_NAME,
	TEAM_TANK_XS_VAR_NAME,
	TEAM_TANK_YS_VAR_NAME,
	TEAM_TANK_HEALTH_VAR_NAME,
	EXPLOSIVE_XS_VAR_NAME,
	EXPLOSIVE_YS_VAR_NAME,
	WALL_XS_VAR_NAME,
	WALL_YS_VAR_NAME,

	builtInIntVariables,
	builtInBooleanVariables,
	builtInDoubleVariables,
	builtInDoubleListVariables,
};

