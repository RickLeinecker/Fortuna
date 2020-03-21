//@flow strict

import * as React from 'react';
import './Battleground.css';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import {imageLoaderInit, getImage, addCallbackWhenImageLoaded} from './ImageLoader.js';
import ImageDrawer from './ImageDrawer.js';
import Tank from '../tanks/Tank.js';
import Wall from './Wall.js';
import Vec from '../casus/blocks/Vec.js';
import Seg from '../geometry/Seg.js';
import GameObject from './GameObject.js';
import {getTank} from '../tanks/TankLoader.js';

const FPS=10;

class Battleground extends React.Component<{||}> {
	intervalID: number;
	alive: boolean;
	testTanks: Array<Tank>;
	gameObjects: Array<GameObject>;
	collisionSegs: Array<Seg>;

	//objects that should be added in next frame
	newObjects: Array<GameObject>;
	objectsToDelete: Array<GameObject>;

	constructor() {
		super();
		window.addEventListener('resize', () => this._rerender());
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());

		this.gameObjects = [];
		this.newObjects = [];
		this.objectsToDelete = [];
		this.testTanks = [getTank(1), getTank(2)];
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
	}

	componentDidMount(): void {
		this._rerender();
		this.alive=true;
		setTimeout(() => this._gameLoop(), 1000/20);
	}

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
	}

	_gameLoop(): void {
		if (!this.alive) {
			//stop updating
			return;
		}
		this.gameObjects = this.gameObjects.concat(this.newObjects);
		this.gameObjects.sort((a, b) => {
			return a.getRenderOrder()-b.getRenderOrder();
		});
		this.newObjects = [];
		this._update();
		this._rerender();
		for (const toRemove: GameObject of this.objectsToDelete) {
			this.gameObjects = this.gameObjects.filter(x => x !== toRemove);
		}
		this.objectsToDelete = [];
		setTimeout(() => this._gameLoop(), 1000/FPS);
	}

	_update(): void {
		for (const gameObject: GameObject of this.gameObjects) {
			gameObject.update(this);
		}
	}

	_rerender(): void {
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, 1e9, 1e9);
		ctx.drawImage(getImage('DIRT_BACKGROUND'), 0, 0, getBattlegroundWidth(), getBattlegroundHeight());
		const drawer=new ImageDrawer(ctx);


		for (const gameObject: GameObject of this.gameObjects) {
			gameObject.render(drawer);
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
