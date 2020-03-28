//@flow strict

import * as React from 'react';
import './Battleground.css';
import {imageLoaderInit, getImage, addCallbackWhenImageLoaded} from './ImageLoader.js';
import ImageDrawer from './ImageDrawer.js';
import Tank from '../tanks/Tank.js';
import Wall from './Wall.js';
import Vec from '../casus/blocks/Vec.js';
import Seg from '../geometry/Seg.js';
import GameObject from './GameObject.js';
import { getTestTank } from '../tanks/TankLoader.js';
import { verifyLogin } from '../globalComponents/verifyLogin.js';

type MatchResult = 
	'IN_PROGRESS' |
	'TIME_UP' |
	'PLAYER_1_WINS' |
	'PLAYER_2_WINS';

const FADE_IN_START=10;
const FADE_IN_LENGTH=60;
const FPS=30;
const INTRO_LENGTH=120;
const MAX_MATCH_LENGTH=INTRO_LENGTH + 30*60;
const POST_MATCH_TIME=90;

const TitleMessageForMatchResult: {[MatchResult]: string} = {
	IN_PROGRESS: '',
	TIME_UP: "Time's Up!",
	PLAYER_1_WINS: 'Player 1 wins!',
	PLAYER_2_WINS: 'Player 2 wins!',
}

class Battleground extends React.Component<{||}> {
	intervalID: number;
	alive: boolean;
	testTanks: Array<Tank>;
	gameObjects: Array<GameObject>;
	collisionSegs: Array<Seg>;

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

	constructor() {
		super();
		verifyLogin();
		window.addEventListener('resize', this.onResize);
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());

		this.gameObjects = [];
		this.newObjects = [];
		this.objectsToDelete = [];
		this.testTanks = [getTestTank(1), getTestTank(2)];
		const walls = [
			new Wall(new Vec(10, 0), 0),
			new Wall(new Vec(60, 0), Math.PI/2),
			new Wall(new Vec(-50, 30), Math.PI/5),
			new Wall(new Vec(-50, -30), -Math.PI/5)
		];
		this.collisionSegs = [
			new Seg(new Vec(-100, 60), new Vec(100, 60)),
			new Seg(new Vec(-100, -60), new Vec(100, -60)),
			new Seg(new Vec(-100, 60), new Vec(-100, -60)),
			new Seg(new Vec(100, 60), new Vec(100, -60))
		];
		for (const w: Wall of walls) {
			this.collisionSegs.push(w.getCollisionWall());
			this.gameObjects.push(w);
		}
		for (const t: Tank of this.testTanks) {
			this.gameObjects.push(t);
		}
		this.matchResult='IN_PROGRESS';
	}

	componentDidMount(): void {
		this._rerender();
		this.alive=true;
		setTimeout(() => this._gameLoop(), 1000/20);
	}

	onResize = () => this._rerender();

	render(): React.Node {
		return (
			<div>
				<canvas
					className="battlegroundCanvas"
					ref="canvas"
				/>
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
		this._checkForWinner();
		if (this.matchResult !== 'IN_PROGRESS') {
			this.postMatchCountdown--;
			if (this.postMatchCountdown === 0) {
				console.log('redirecting to something else');
				window.location.href='/BattleArena';
			}
		}
		for (const gameObject: GameObject of this.gameObjects) {
			gameObject.update(this);
		}
	}

	_rerender(): void {
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		const drawer=new ImageDrawer(ctx);
		drawer.fillBlackRect(1);

		//camera movement and setup
		if (this.lifetimeCounter===30) {
			this.targetZoomScale=2.5;
			this.targetCameraPos=this.getTanks()[0].getPosition();
		}
		if (this.lifetimeCounter===60) {
			this.targetZoomScale=2.5;
			this.targetCameraPos=this.getTanks()[1].getPosition();
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
		drawer.draw(getImage('DIRT_BACKGROUND'), new Vec(0, 0), 200, 0, 1, 120);
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
			const timeLeft=MAX_MATCH_LENGTH-this.lifetimeCounter;
			const secondsLeft=Math.max(0, Math.ceil(timeLeft/30));
			drawer.drawTimeText(''+secondsLeft);
		}

		//fade in curtain
		if (this.lifetimeCounter<FADE_IN_START) {
			drawer.fillBlackRect(1);
		}
		else if (this.lifetimeCounter-FADE_IN_START<FADE_IN_LENGTH) {
			const alpha=1-(this.lifetimeCounter-FADE_IN_START)/FADE_IN_LENGTH; 
			drawer.fillBlackRect(alpha);
		}
	}

	_resizeCanvas(): void {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const targetWidth=canvas.clientWidth;
		const targetHeight=targetWidth*8/16;
		if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
			canvas.width = targetWidth;
			canvas.height = targetHeight;
		}
	}

	_checkForWinner(): void {
		//TODO: report winner to API
		if (this.matchResult !== 'IN_PROGRESS') {
			return;
		}
		if (this.lifetimeCounter > MAX_MATCH_LENGTH) {
			this.matchResult = 'TIME_UP';
			this.postMatchCountdown=POST_MATCH_TIME;
			return;
		}
		if (this.getTanks()[0].getHealth()<=0) {
			this.matchResult = 'PLAYER_2_WINS';
			this.postMatchCountdown=POST_MATCH_TIME;
			return;
		}
		if (this.getTanks()[1].getHealth()<=0) {
			this.matchResult = 'PLAYER_1_WINS';
			this.postMatchCountdown=POST_MATCH_TIME;
			return;
		}
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
		return this.testTanks;
	}

	getAllGameObjects(): Array<GameObject> {
		return this.gameObjects;
	}

	createGameObject(toCreate: GameObject): void {
		this.newObjects.push(toCreate);
	}

	deleteGameObject(toDelete: GameObject): void {
		this.objectsToDelete.push(toDelete);
	}

}

export default Battleground;
