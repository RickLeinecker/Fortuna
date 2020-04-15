//@flow strict

import * as React from 'react';
import './Battleground.css';
import { imageLoaderInit, getImage, addCallbackWhenImageLoaded } from './ImageLoader.js';
import ImageDrawer from './ImageDrawer.js';
import Tank from '../tanks/Tank.js';
import Wall from './Wall.js';
import Vec from '../casus/blocks/Vec.js';
import Seg from '../geometry/Seg.js';
import GameObject from './GameObject.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import getReturnToFromBattlegroundLink from './getReturnToFromBattlegroundLink.js';
import getTanksToFightOnBattleground from './getTanksToFightOnBattleground.js';
import reportMatchResultAPICall from '../globalComponents/apiCalls/reportMatchResultAPICall.js';
import getBattlegroundArena from './getBattlegroundArena.js';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import { ToastContainer } from 'react-toastify';

import type {ArenaType} from './ArenaType.js';
import type {ImageName} from './ImageName.js';

type Props = {|
	setPlayersTank: (Array<?Tank>, Array<?Tank>) => void,
	setTimeLeftText: (string) => void,
	addDebugLine: (string) => void,
	setFadeInAlpha: (number) => void,
|};

type MatchResult = 
	'IN_PROGRESS' |
	'TIME_UP' |
	'PLAYER_1_WINS' |
	'PLAYER_2_WINS';

const FADE_IN_START=10;
const FADE_IN_LENGTH=60;
const FPS=30;
const INTRO_LENGTH=120;
const POST_MATCH_TIME=90;

const backgroundForArena: {[ArenaType]: ImageName} = {
	DIRT: 'DIRT_BACKGROUND',
	HEX: 'HEX_BACKGROUND',
	LUNAR: 'LUNAR_BACKGROUND',
	CANDEN: 'CANDEN_BACKGROUND',
}

const arenaWidth: {[ArenaType]: number} = {
	DIRT: 200,
	HEX: 200,
	LUNAR: 300,
	CANDEN: 300,
}

const matchLengthForArena: {[ArenaType]: number} = {
	DIRT: INTRO_LENGTH + 30*60,
	HEX: INTRO_LENGTH + 30*60,
	LUNAR: INTRO_LENGTH + 30*100,
	CANDEN: INTRO_LENGTH+ 30*100,
}

const wallsForArena: {[ArenaType]: Array<Wall>} = {
	DIRT: [
		new Wall(new Vec(10, 0), 0, false),
		new Wall(new Vec(60, 0), Math.PI/2, false),
		new Wall(new Vec(-50, 30), Math.PI/5, false),
		new Wall(new Vec(-50, -30), -Math.PI/5, false),
	],
	HEX: [
		new Wall(new Vec(-30, 22), Math.PI/4, false),
		new Wall(new Vec(-30, -22), -Math.PI/4, false),
		new Wall(new Vec(30, 22), Math.PI*3/4, false),
		new Wall(new Vec(30, -22), -Math.PI*3/4, false),

		new Wall(new Vec(-75, 25), Math.PI/2, false),
		new Wall(new Vec(75, -25), -Math.PI/2, false),
	],
	LUNAR: [
		new Wall(new Vec(-100, -15), Math.PI*.45, true),
		new Wall(new Vec(-84, 60), Math.PI*-0.1, true),
		new Wall(new Vec(-14, -10), Math.PI*-0.2, true),
		new Wall(new Vec(55, -52), Math.PI*0.3, true),
		new Wall(new Vec(50, 40), Math.PI*0.43, true),
		new Wall(new Vec(125, -30), Math.PI*0.49, true),
	],
	CANDEN: [
		new Wall(new Vec(-115, 0), Math.PI*.5, true),
		new Wall(new Vec(115, 0), Math.PI*.5, true),
		new Wall(new Vec(0, 0), 0, true),
		new Wall(new Vec(0, 60), Math.PI*.5, true),
		new Wall(new Vec(0, -60), Math.PI*.5, true),
	],
}

const spawnPointsForArena: {[ArenaType]: Array<Vec>} = {
	DIRT: [
		new Vec(-70, 40),
		new Vec(-70, 40),
		new Vec(-70, 40),
		new Vec(70, -40),
		new Vec(70, -40),
		new Vec(70, -40),
	],
	HEX: [
		new Vec(-60, -30),
		new Vec(-60, -30),
		new Vec(-60, -30),
		new Vec(60, 30),
		new Vec(60, 30),
		new Vec(60, 30),
	],
	LUNAR: [
		new Vec(-105, -60),
		new Vec(-70, -40),
		new Vec(-55, -70),
		new Vec(105, 60),
		new Vec(70, 40),
		new Vec(110, 20),
	],
	CANDEN: [
		new Vec(-133, 0),
		new Vec(-100, 60),
		new Vec(-100, -60),
		new Vec(133, 0),
		new Vec(100, 60),
		new Vec(100, -60),
	],
}

const TitleMessageForMatchResult: {[MatchResult]: string} = {
	IN_PROGRESS: '',
	TIME_UP: "Time's Up!",
	PLAYER_1_WINS: 'Player 1 wins!',
	PLAYER_2_WINS: 'Player 2 wins!',
}

class Battleground extends React.Component<Props> {
	intervalID: number;
	alive: boolean;
	testTanks: Array<?Tank>;
	gameObjects: Array<GameObject>;
	collisionSegs: Array<Seg>;
	matchIdToReport: ?string;
	arena: ArenaType;

	//objects that should be added in next frame
	newObjects: Array<GameObject>;
	objectsToDelete: Array<GameObject>;
	
	//intro and closing scene variables
	lifetimeCounter: number = 0;
	currentZoomScale: number = 1;
	currentCameraPos: Vec = new Vec(0, 0);
	targetZoomScale: number = 1;
	targetCameraPos: Vec = new Vec(0, 0);
	matchResult: MatchResult;
	postMatchCountdown: number = 0;
	maxMatchLength: number;

	constructor(props: Props) {
		super(props);
		verifyLogin();
		window.addEventListener('resize', this.onResize);
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());

		this.arena=getBattlegroundArena();
		this.setUpForArena(this.arena);
	}

	setUpForArena(arena: ArenaType) {
		console.log('setting up arena: '+arena);
		this.arena=arena;
		this.gameObjects = [];
		this.newObjects = [];
		this.objectsToDelete = [];
		this.testTanks = [null, null, null, null, null, null];
		this.lifetimeCounter = 0;
		this.maxMatchLength = matchLengthForArena[arena];
		const walls = wallsForArena[arena];
		const W=arenaWidth[arena]/2;
		const H=W/200*120;
		this.collisionSegs = [
			new Seg(new Vec(-W, H), new Vec(W, H)),
			new Seg(new Vec(-W, -H), new Vec(W, -H)),
			new Seg(new Vec(-W, H), new Vec(-W, -H)),
			new Seg(new Vec(W, H), new Vec(W, -H))
		];
		for (const w: Wall of walls) {
			this.collisionSegs.push(w.getCollisionWall());
			this.gameObjects.push(w);
		}
		this.matchResult='IN_PROGRESS';
		this.matchIdToReport=null;
	}

	componentDidMount(): void {
		this._rerender();
		this.alive=true;
		getTanksToFightOnBattleground(
			(tankLoaded, index) => {
				this.testTanks[index]=tankLoaded;
				this.gameObjects.push(tankLoaded);
				const spawnPoint=spawnPointsForArena[this.arena][index];
				tankLoaded.position=spawnPoint;
				tankLoaded.setRenderOrderOffset(index);
			},
			matchId => {this.matchIdToReport=matchId;},
			arenaType => {this.setUpForArena(arenaType);}
		);
		setTimeout(() => this._gameLoop(), 1000/20);
	}

	onResize = () => this._rerender();

	render(): React.Node {
		return (
			<div className="battlegroundCanvasDiv">
				<canvas
					className="battlegroundCanvas"
					ref="canvas"
				/>
				<ToastContainer />
			</div>
		);
	}

	componentWillUnmount() {
		this.alive=false;
		window.removeEventListener('resize', this.onResize);
	}

	_gameLoop(): void {
		if (!this.alive) {
			//stop updating
			return;
		}
		this.lifetimeCounter++;

		//sort objects in render order
		this.gameObjects = this.gameObjects.concat(this.newObjects);
		this.gameObjects.sort((a, b) => {
			return a.getRenderOrder()-b.getRenderOrder();
		});
		this.newObjects = [];

		//update and render
		if (this.lifetimeCounter > INTRO_LENGTH) {
			this._update();
		}
		this._rerender();

		for (const toRemove: GameObject of this.objectsToDelete) {
			this.gameObjects = this.gameObjects.filter(x => x !== toRemove);
		}
		this.objectsToDelete = [];
		setTimeout(() => this._gameLoop(), 1000/FPS);
	}

	_update(): void {
		if (this.lifetimeCounter>INTRO_LENGTH) {
			this._checkForWinner();
		}
		if (this.matchResult !== 'IN_PROGRESS') {
			this.postMatchCountdown--;
			if (this.postMatchCountdown === 0) {
				const returnTo=getReturnToFromBattlegroundLink();
				window.location.href=returnTo;
			}
		}
		for (const gameObject: GameObject of this.gameObjects) {
			gameObject.update(this);
		}
	}

	_rerender(): void {
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		if (canvas==null) {
			console.log('warning: null canvas!');
			return;
		}
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		const drawer=new ImageDrawer(ctx, getBattlegroundWidth, getBattlegroundHeight, arenaWidth[this.arena]);
		drawer.fillBlackRect(1);

		//camera movement and setup
		if (this.lifetimeCounter===30) {
			this.targetZoomScale=2.5;
			this.targetCameraPos=this.testTanks[0]?.getPosition()??new Vec(0, 0);
		}
		if (this.lifetimeCounter===60) {
			this.targetZoomScale=2.5;
			this.targetCameraPos=this.testTanks[3]?.getPosition()??new Vec(0, 0);
		}
		if (this.lifetimeCounter===90) {
			this.targetZoomScale=1;
			this.targetCameraPos=new Vec(0, 0);
		}
		this.currentZoomScale=this._lerp(this.currentZoomScale, this.targetZoomScale, 0.2);
		this.currentCameraPos=this._lerpV(this.currentCameraPos, this.targetCameraPos, 0.2);
		drawer.setCameraPosition(this.currentCameraPos);
		drawer.setZoomScale(this.currentZoomScale);

		//actually render all of the objects
		const backgroundImageName=backgroundForArena[this.arena];
		const aWidth=arenaWidth[this.arena];
		const aHeight=aWidth/200*120;
		drawer.draw(getImage(backgroundImageName), new Vec(0, 0), aWidth, 0, 1, aHeight);
		for (const gameObject: GameObject of this.gameObjects) {
			gameObject.render(drawer);
		}

		//title text
		const secondsLeft=Math.ceil((INTRO_LENGTH-this.lifetimeCounter)/30.0);
		if (secondsLeft<=3 && secondsLeft>=1) {
			drawer.drawTitleText(''+secondsLeft);
		}
		else if (secondsLeft===0) {
			drawer.drawTitleText('GO!');
		}
		const resultText=TitleMessageForMatchResult[this.matchResult];
		drawer.drawTitleText(resultText);

		//countdown timer
		if (this.lifetimeCounter>INTRO_LENGTH) {
			const timeLeft=this.maxMatchLength-this.lifetimeCounter;
			const secondsLeft=Math.max(0, Math.ceil(timeLeft/30));
			this.props.setTimeLeftText(''+secondsLeft);
		}

		//fade in curtain
		if (this.lifetimeCounter<FADE_IN_START) {
			drawer.fillBlackRect(1);
			this.props.setFadeInAlpha(1);
		}
		else if (this.lifetimeCounter-FADE_IN_START<FADE_IN_LENGTH) {
			const alpha=1-(this.lifetimeCounter-FADE_IN_START)/FADE_IN_LENGTH; 
			drawer.fillBlackRect(alpha);
			this.props.setFadeInAlpha(alpha);
		}
		else {
			this.props.setFadeInAlpha(0);
		}
		if (this.testTanks[0]!=null && this.testTanks[3]!=null) {
			this.props.setPlayersTank(this.testTanks.slice(0, 3), this.testTanks.slice(3, 6));
		}

	}

	_resizeCanvas(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		if (canvas==null) {
			console.log('warning: null canvas!');
			return;
		}
		const targetWidth=canvas.clientWidth;
		const targetHeight=targetWidth/200*120;
		if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
			canvas.width = targetWidth;
			canvas.height = targetHeight;
		}
	}

	_checkForWinner(): void {
		if (this.matchResult !== 'IN_PROGRESS') {
			return;
		}
		if (this.lifetimeCounter > this.maxMatchLength) {
			this.matchResult = 'TIME_UP';
			this.postMatchCountdown=POST_MATCH_TIME;
			this.reportWinner(0);
			return;
		}
		let p1TanksAlive=0, p2TanksAlive=0;
		for (let i=0; i<6; i++) {
			const tank=this.testTanks[i];
			if (tank!=null && tank.getHealth()>0) {
				if (i<3) {
					p1TanksAlive++;
				}
				else {
					p2TanksAlive++;
				}
			}
		}
		if (p1TanksAlive===0) {
			this.matchResult = 'PLAYER_2_WINS';
			this.postMatchCountdown=POST_MATCH_TIME;
			this.reportWinner(2);
			return;
		}
		if (p2TanksAlive===0) {
			this.matchResult = 'PLAYER_1_WINS';
			this.postMatchCountdown=POST_MATCH_TIME;
			this.reportWinner(1);
			return;
		}
	}

	reportWinner(winner: 0|1|2) {
		if (this.matchIdToReport == null) {
			//not a match, just a training exercise
			return;
		}
		reportMatchResultAPICall(winner, this.matchIdToReport);
	}

	_lerp(a: number, b: number, time: number) {
		return b*time+a*(1-time);
	}

	_lerpV(a: Vec, b: Vec, time: number) {
		return b.scale(time).add(a.scale(1-time));
	}

	getCollisionSegs(): Array<Seg> {
		return this.collisionSegs;
	}

	getTanks(): Array<Tank> {
		const nonNullTanks=[];
		for (const t: ?Tank of this.testTanks) {
			if (t!=null) {
				nonNullTanks.push(t);
			}
		}
		return nonNullTanks;
	}

	getTanksOnOtherTeam(me: Tank): Array<Tank> {
		const myIndex=this.testTanks.indexOf(me);
		const startIndex=myIndex<3?3:0;
		const endIndex=myIndex<3?5:2;
		const enemyTanks=[];
		for (let i=startIndex; i<=endIndex; i++) {
			if (this.testTanks[i] != null) {
				enemyTanks.push(this.testTanks[i]);
			}
		}
		return enemyTanks;
	}

	getTanksOnSameTeam(me: Tank): Array<Tank> {
		const myIndex=this.testTanks.indexOf(me);
		const startIndex=myIndex<3?0:3;
		const endIndex=myIndex<3?2:5;
		const friendlyTanks=[];
		for (let i=startIndex; i<=endIndex; i++) {
			if (this.testTanks[i] != null) {
				friendlyTanks.push(this.testTanks[i]);
			}
		}
		return friendlyTanks;
	}

	getAllGameObjects(): Array<GameObject> {
		return this.gameObjects;
	}

	createGameObject(toCreate: GameObject): void {
		this.newObjects.push(toCreate);
	}

	deleteGameObject(toDelete: GameObject): void {
		this.objectsToDelete.push(toDelete);
		if (this.testTanks.filter(t => t===toDelete).length>0) {
			this.testTanks[this.testTanks.indexOf(toDelete)]=null;
		}
	}

	addDebugLine(line: string): void {
		if (this.matchIdToReport != null) {
			// then this is an actual match against another real player, not a training
			// match, so don't show any debug
			return;
		}
		this.props.addDebugLine(line);
	}

}

export default Battleground;
