//@flow strict

import Vec from '../casus/blocks/Vec.js';
import TankPart from './TankPart.js'
import Gun from './Gun.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import { getImage } from '../battleground/ImageLoader.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import { getInterpriterState, setInterpriterState } from '../casus/interpreter/InterpriterState.js';
import { verifyDouble, verifyBoolean } from '../casus/interpreter/Value.js';
import Seg from '../geometry/Seg.js';
import Scanner from './Scanner.js';
import Chassis from './Chassis.js';
import Jammer from './Jammer.js';
import Treads from './Treads.js';
import Circle from '../geometry/Circle.js';
import BooleanValue from '../casus/interpreter/BooleanValue.js';
import IntValue from '../casus/interpreter/IntValue.js';
import DoubleValue from '../casus/interpreter/DoubleValue.js';
import DoubleListValue from '../casus/interpreter/DoubleListValue.js';
import GameObject from '../battleground/GameObject.js';
import C4 from '../battleground/gameobjects/C4.js';
import Mine from '../battleground/gameobjects/Mine.js';
import {
	createGreenParticle, 
	createEmberParticle, 
	createSmokeCloud
} from '../battleground/gameobjects/Particle.js';
import Bullet from '../battleground/gameobjects/Bullet.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';

import {
	RAN_INTO_WALL_VAR_NAME,
	USE_MINE_VAR_NAME,
	USE_C4_VAR_NAME,
	USE_NITRO_REPAIR_VAR_NAME,
	USE_OVERDRIVE_VAR_NAME,
	USE_MISSILE_TRACKER_VAR_NAME,
	TURRET_DIRECTION_VAR_NAME,

	FORWARD_MOVEMENT_VAR_NAME,
	TARGET_DIRECTION_VAR_NAME,
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
} from '../casus/userInteraction/CasusSpecialVariables.js';

import type Battleground from '../battleground/Battleground.js';


const NITRO_REPAIR_LENGTH=30*3;
const NITRO_REPAIR_HEALTH_BONUS=50;
const ORIG_MOVE_SPEED=0.7;
const NITRO_MOVE_SPEED=1.5;
const ORIG_TURN_DIVIDER=2;
const NITRO_TURN_DIVIDER=1.4;

const OVERDRIVE_LENGTH=30*4;

class Tank extends GameObject {
	//game state
	rotation: number;
	haveC4: boolean;
	c4ToBlowUp: ?C4;
	minesLeft: number;
	usedMineLastFrame: boolean;
	haveNitroRepair: boolean;
	nitroRepairTimerLeft: number;
	haveOverdrive: boolean;
	overdriveTimerLeft: number;
	haveMissileTracker: boolean;
	health: number;
	renderOrderOffset: number;

	// parts: 
	chassis: Chassis;
	mainGun: Gun;
	secondaryGun: Gun;
	scanner: Scanner;
	scannerAddonOne: TankPart;
	scannerAddonTwo: TankPart;
	jammer: Jammer;
	treads: Treads;
	itemOne: TankPart;
	itemTwo: TankPart;
	itemThree: TankPart;
	// Parts will be an array of 11 values:
	// [0] = Chassis
	// [1] = Main Gun, [2] = Secondary Gun
	// [3] = Scanner, [4] = Scanner Addon 1, [5] = Scanner Addon 2
	// [6] = Jammer
	// [7] = Treads
	// [8] = Item 1, [9] = Item 2, [10] = Item 3
	parts: Array<TankPart>;

	// id and name:
	tankName: string;
	_id: string;
	userId: string;

	// Casus:
	interpriterState: InterpriterState;
	casusCode: ContainerBlock;

	constructor(
		position: Vec, 
		chassis: Chassis, 
		mainGun: Gun, 
		secondaryGun: Gun,
		scanner: Scanner,
		scannerAddonOne: TankPart,
		scannerAddonTwo: TankPart, 
		jammer: Jammer,
		treads: Treads,
		itemOne: TankPart,
		itemTwo: TankPart,
		itemThree: TankPart,
		casusCode: ContainerBlock,
		tankName: string,
		_id: string,
		userId: string,
	) {
		super(position);

		this.chassis = chassis;
		this.mainGun = mainGun;
		this.secondaryGun = secondaryGun;
		this.scanner = scanner;
		this.scannerAddonOne = scannerAddonOne;
		this.scannerAddonTwo = scannerAddonTwo;
		this.jammer = jammer;
		this.treads = treads;
		this.itemOne = itemOne;
		this.itemTwo = itemTwo;
		this.itemThree = itemThree;
		this.parts = [chassis, mainGun, secondaryGun, scanner, scannerAddonOne, scannerAddonTwo, jammer, treads, itemOne, itemTwo, itemThree];
		this.tankName = tankName;
		this._id = _id;
		this.userId = userId;

		this.interpriterState = new InterpriterState();
		this.casusCode = casusCode;
		this.rotation = Math.PI*0.5;
		this.usedMineLastFrame = false;
		this.nitroRepairTimerLeft = 0;
		this.overdriveTimerLeft = 0;
		this.health = this._getArmorOffset();
		
		// astar stuff
		let g = 0;
		let f = 0;
		let h = 0;


		//process onetimeitems from items passed into constructor
		this.haveC4 = false; 
		this.minesLeft = 0;
		this.haveNitroRepair = false;
		this.haveOverdrive = false;
		this.haveMissileTracker = false;
		for (const itemPart of [itemOne, itemTwo, itemThree]) {
			if (itemPart.name === 'mine') {
				this.minesLeft++;
			}
			else if (itemPart.name === 'c4') {
				this.haveC4 = true;
			}
			else if (itemPart.name === 'overdrive') {
				this.haveOverdrive = true;
			}
			else if (itemPart.name === 'nitroRepair') {
				this.haveNitroRepair = true;
			}
			else if (itemPart.name === 'missileTrackingBeacon') {
				this.haveMissileTracker = true;
			}
		}

	}

	// astar(battleground: Battleground): boolean {

	// 	let goal = ; // enemy position
	// 	let start = ; // current position
	
	// 	const findNeighbor = () => {

	// 	}

	// 	const addNeighbors = () => {

	// 	}

	// 	const createPath = () => {

	// 	}

	// 	// start?
	// 	const solveMap = () => {

	// 	}


	// }

	update(battleground: Battleground): void {
		if (this.getHealth()<=0) {
			createSmokeCloud(this.getPosition(), battleground);
			createSmokeCloud(this.getPosition(), battleground);
			battleground.deleteGameObject(this);
			return;
		}
		this.setCasusVariables(battleground.getCollisionSegs(), battleground.getTanks(), battleground);
		this.executeCasusFrame(battleground);	
		this.executePhysics(battleground.getCollisionSegs(), battleground.getTanks(), battleground);
	}

	executeCasusFrame(battleground: Battleground): void {
		this.interpriterState.resetStatementsMade();
		this.interpriterState.resetDebug();
		setInterpriterState(this.interpriterState);	
		this.casusCode.runEvaluate();
		this.interpriterState = getInterpriterState();
		for (const debugLine of this.interpriterState.printedStatements) {
			battleground.addDebugLine(' '+this.tankName+': '+debugLine);
		}
	}

	setCasusVariables(walls: Array<Seg>, tanks: Array<Tank>, battleground: Battleground): void {
		this._setDouble(TANK_X_VAR_NAME, this.position.x);
		this._setDouble(TANK_Y_VAR_NAME, this.position.y);
		this._setDouble(TANK_HEALTH_VAR_NAME, this.health);

		//set generic casus lists
		const wallXs=[];
		const wallYs=[];
		for (const wall: Seg of walls) {
			wallXs.push(wall.from.x);
			wallYs.push(wall.from.y);
			wallXs.push(wall.to.x);
			wallYs.push(wall.to.y);
		}
		this._setDoubleArray(WALL_XS_VAR_NAME, wallXs);
		this._setDoubleArray(WALL_YS_VAR_NAME, wallYs);

		const enemyTanks=this._getEnemyTanks(battleground);
		const otherTankXs=enemyTanks.map(tank => tank.getPosition().x);
		const otherTankYs=enemyTanks.map(tank => tank.getPosition().y);
		const otherTankHealths=enemyTanks.map(tank => tank.health);
		this._setDoubleArray(ENEMY_TANK_XS_VAR_NAME, otherTankXs);
		this._setDoubleArray(ENEMY_TANK_YS_VAR_NAME, otherTankYs);
		this._setDoubleArray(ENEMY_TANK_HEALTH_VAR_NAME, otherTankHealths);

		const friendlyTanks=this._getFriendlyTanks(battleground);
		const friendlyTankXs=friendlyTanks.map(tank => tank.getPosition().x);
		const friendlyTankYs=friendlyTanks.map(tank => tank.getPosition().y);
		const friendlyTankHealths=friendlyTanks.map(tank => tank.health);
		this._setDoubleArray(TEAM_TANK_XS_VAR_NAME, friendlyTankXs);
		this._setDoubleArray(TEAM_TANK_YS_VAR_NAME, friendlyTankYs);
		this._setDoubleArray(TEAM_TANK_HEALTH_VAR_NAME, friendlyTankHealths);

		const mines=this._getMines(battleground);
		const minesXs=mines.map(mine => mine.getPosition().x);
		const minesYs=mines.map(mine => mine.getPosition().y);
		this._setDoubleArray(EXPLOSIVE_XS_VAR_NAME, minesXs);
		this._setDoubleArray(EXPLOSIVE_YS_VAR_NAME, minesYs);
		//end of set generic casus lists
	}
	
	executePhysics(walls: Array<Seg>, tanks: Array<Tank>, battleground: Battleground): void {
		//movement stuff
		const otherTanks = tanks.filter(otherTank => otherTank !== this);
		const forwardMovementUnclamped = this._getDouble(FORWARD_MOVEMENT_VAR_NAME);
		let forwardMovement = Math.max(-1, Math.min(1, forwardMovementUnclamped));
		const targetDirection = this._getDouble(TARGET_DIRECTION_VAR_NAME);

		const unit=new Vec(1, 0);
		const targetVec=unit.rotate(targetDirection);
		const facingVec=unit.rotate(this.rotation);

		let dAngle=Math.asin(facingVec.cross(targetVec));
		if (targetVec.dot(facingVec)<0) {
			if (dAngle<0) {
				dAngle = -Math.PI - dAngle;
			}
			else {
				dAngle = Math.PI + dAngle;
			}
		}
		const totalMovement=Math.abs(forwardMovement)+2*Math.abs(dAngle);
		forwardMovement/=Math.max(1, totalMovement)*1;
		const turnSpeed=this.nitroRepairTimerLeft>0 ? NITRO_TURN_DIVIDER : ORIG_TURN_DIVIDER;
		dAngle/=Math.max(1, totalMovement)*turnSpeed;

		const rotationMultiplier = this._getTurnSpeedMultiplier();
		this.rotation+=dAngle*rotationMultiplier;
		const oldPosition=this.position;
		const moveSpeed=this.nitroRepairTimerLeft>0 ? NITRO_MOVE_SPEED : ORIG_MOVE_SPEED;
		const speedMultiplier = this._getMoveSpeedMultiplier();
		this.position=this.position.add(unit.rotate(this.rotation).scale(moveSpeed*forwardMovement*speedMultiplier));
		let ranIntoWall=false;
		if (this.intersectingTankOrWall(walls, otherTanks)) {
			this.position=oldPosition;
			ranIntoWall=true;
		}

		this._setBoolean(RAN_INTO_WALL_VAR_NAME, ranIntoWall);
		//end of movement stuff
		
		//gun stuff
		//end of gun stuff
		
		//placing items stuff
		const shouldPlaceC4 = this._getBoolean(USE_C4_VAR_NAME);
		if (shouldPlaceC4) {
			if (this.haveC4) {
				this.haveC4=false;	
				this.c4ToBlowUp=new C4(this.getPosition());
				battleground.createGameObject(this.c4ToBlowUp);
			}
		}
		else {
			if (this.c4ToBlowUp != null) {
				this.c4ToBlowUp.explode(battleground);
				this.c4ToBlowUp=null;
			}
		}

		const placeMineThisFrame = this._getBoolean(USE_MINE_VAR_NAME);
		if (placeMineThisFrame && !this.usedMineLastFrame && this.minesLeft > 0) {
			this.minesLeft--;
			battleground.createGameObject(new Mine(this.getPosition()));
		}
		this.usedMineLastFrame = placeMineThisFrame;
		//end of placing items stuff
		
		//nitro repair stuff
		if (this.haveNitroRepair && this._getBoolean(USE_NITRO_REPAIR_VAR_NAME)) {
			this.haveNitroRepair=false;
			this.health=Math.min(this.health+NITRO_REPAIR_HEALTH_BONUS, this._getArmorOffset());
			this.nitroRepairTimerLeft=NITRO_REPAIR_LENGTH;
		}
		this.nitroRepairTimerLeft--;
		if (this.nitroRepairTimerLeft>0) {
			createGreenParticle(this.getPosition(), battleground);
		}
		//end of nitro repair stuff
		
		//overdrive stuff
		if (this.haveOverdrive && this._getBoolean(USE_OVERDRIVE_VAR_NAME)) {
			this.haveOverdrive = false;
			this.overdriveTimerLeft=OVERDRIVE_LENGTH;
		}
		this.overdriveTimerLeft--;
		if (this.overdriveTimerLeft>0) {
			createEmberParticle(this.getPosition(), battleground);
		}
		//end of overdrive stuff
		
		//missile tracking stuff
		if (this.haveMissileTracker && this._getBoolean(USE_MISSILE_TRACKER_VAR_NAME)) {
			this.haveMissileTracker=false;
			const targetAngle=this._getDouble(TURRET_DIRECTION_VAR_NAME);
			const bullet=new Bullet(this.getPosition(), targetAngle, this, 'MISSILE_TRACKER_DART');
			battleground.createGameObject(bullet);
		}
		//end of missile tracking stuff
		
		//update tank parts if I need to
		for (const part: ?TankPart of this.parts) {
			if (part != null) {
				part.update(this.interpriterState, battleground, this.getPosition(), this.rotation, this);
			}
		}
		//end of updating tank parts
	}

	intersectingTankOrWall(walls: Array<Seg>, tanks: Array<Tank>): boolean {
		const me=this.getBoundingCircle();
		for (const wall: Seg of walls) {
			const myCircle=new Circle(me.c, me.r+wall.paddingWidth);
			if (myCircle.intersectsSeg(wall)) {
				return true;
			}
		}
		for (const otherTank: Tank of tanks) {
			if (me.intersectsCircle(otherTank.getBoundingCircle())) {
				return true;
			}
		}
		return false;
	}

	getBoundingCircle(): Circle {
		return new Circle(this.getPosition(), 4);
	}

	render(drawer: ImageDrawer): void {
		drawer.draw(getImage('SHADOW'), this.getPosition(), 16, this.rotation);
		this.treads.drawSelf(drawer, this.getPosition(), this.rotation);
		if (this.secondaryGun!=null) {
			this.secondaryGun.drawSelf(drawer, this.getPosition(), this.rotation);
		}
		this.chassis.drawSelf(drawer, this.getPosition(), this.rotation);
		if (this.scanner!=null) {
			this.scanner.drawSelf(drawer, this.getPosition(), this.rotation);
		}
		if (this.jammer!=null) {
			this.jammer.drawSelf(drawer, this.getPosition(), this.rotation);
		}
		if (this.mainGun!=null) {
			this.mainGun.drawSelf(drawer, this.getPosition(), this.rotation);
		}
	}

	isJammed(): boolean {
		if (this.scanner == null) {
			return false;
		}
		return this.scanner.isJammed();
	}

	_setDouble(name: string, to: number): void {
		this.interpriterState.setVariable('DOUBLE', name, new DoubleValue(to));
	}

	_setBoolean(name: string, to: boolean): void {
		this.interpriterState.setVariable('BOOLEAN', name, new BooleanValue(to));
	}

	_setDoubleArray(name: string, to: Array<number>): void {
		const list=new DoubleListValue();
		for (let i=0; i<to.length; i++) {
			list.setAt(new IntValue(i), new DoubleValue(to[i]));
		}

		this.interpriterState.setVariable('DOUBLE_LIST', name, list);
	}

	_getDouble(name: string): number {
		return verifyDouble(this.interpriterState.getVariable('DOUBLE', name)).val;
	}

	_getBoolean(name: string): boolean {
		return verifyBoolean(this.interpriterState.getVariable('BOOLEAN', name)).val;
	}

	_getEnemyTanks(battleground: Battleground): Array<Tank> {
		if (this.scanner == null) {
			return [];
		}
		return this.scanner.getEnemyTanks(
			this.interpriterState, 
			battleground, 
			this.getPosition(), 
			this.rotation, 
			this
		);
	}

	_getFriendlyTanks(battleground: Battleground): Array<Tank> {
		//for now at least just let users see all of their teammates, even if they are out of scanner range
		return battleground.getTanksOnSameTeam(this);
	}

	_getMines(battleground: Battleground): Array<GameObject> {
		if (this.scanner == null) {
			return [];
		}
		return this.scanner.getMines(
			this.interpriterState, 
			battleground, 
			this.getPosition(), 
			this.rotation, 
			this
		);
	}

	_getMoveSpeedMultiplier(): number {
		let ans=1;
		for (const part: ?TankPart of this.parts) {
			if (part != null) {
				ans*=part.getMoveSpeedMultiplier();
			}
		}
		return ans;
	}

	_getTurnSpeedMultiplier(): number {
		let ans=1;
		for (const part: ?TankPart of this.parts) {
			if (part != null) {
				ans*=part.getTurnSpeedMultiplier();
			}
		}
		return ans;
	}

	_getArmorOffset(): number {
		let ans=0;
		for (const part: ?TankPart of this.parts) {
			if (part != null) {
				ans+=part.getArmorOffset();
			}
		}
		return ans;
	}

	_getPointTotal(): number {
		let ans=0;
		for (const part: ?TankPart of this.parts) {
			if (part != null) {
				ans+=part.getPointCost();
			}
		}
		return ans;
	}
	
	getUsingOverdrive(): boolean {
		return this.overdriveTimerLeft>0;
	}

	getJammed(): void {
		if (this.scanner != null) {
			this.scanner.getJammed();
		}
	}

	takeDamage(damageAmount: number): void {
		this.health-=damageAmount;
		const maxHealth=this._getArmorOffset();
		console.log('Took damage, now have '+this.health+' / '+maxHealth);
	}

	getHealth(): number {
		return this.health;
	}

	getRenderOrder(): number {
		return 0.001+this.renderOrderOffset/1000;
	}

	setRenderOrderOffset(newOffset: number): void {
		this.renderOrderOffset=newOffset;
	}

	setTurretAngleForDisplayOnly(turretAngle: number): void {
		if (this.mainGun != null) {
			this.mainGun.displayAngle=turretAngle;
		}
	}

	getHitRecursionLimit(): boolean {
		return this.interpriterState.everHitRecursionLimit();
	}

	getHitInstructionsLimit(): boolean {
		return this.interpriterState.everHitInstructionLimit();
	}

}

export default Tank;
