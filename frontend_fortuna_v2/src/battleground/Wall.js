//@flow strict

import Vec from '../casus/blocks/Vec.js';
import ImageDrawer from './ImageDrawer.js';
import {getImage} from './ImageLoader.js';
import Seg from '../geometry/Seg.js';
import GameObject from './GameObject.js';

const WALL_LENGTH=17;
const WALL_WIDTH=3;
const SMALL_DRAW_WIDTH=45;
const BIG_DRAW_WIDTH=70;

class Wall extends GameObject {
	angle: number;
	big: boolean;
	width: number;
	length: number;
	drawWidth: number;

	constructor(position: Vec, angle: number, big: boolean) {
		super(position);
		this.angle = angle;
		this.big=big;
		this.drawWidth=big?BIG_DRAW_WIDTH:SMALL_DRAW_WIDTH;
		this.width=WALL_WIDTH;
		this.length=WALL_LENGTH;
    this.position = position;
		if (big) {
			this.width*=BIG_DRAW_WIDTH/SMALL_DRAW_WIDTH;
			this.length*=BIG_DRAW_WIDTH/SMALL_DRAW_WIDTH;
		}
	}

  getWallCoords()
  {
    return {
      POSITION: this.position, 
      ANGLE: this.angle, 
      WIDTH: this.width, 
      LENGTH: this.length
    }
  }
	
	render(drawer: ImageDrawer): void {
		drawer.draw(getImage(this.big?'WALL_BIG':'WALL'), this.getPosition(), this.drawWidth, this.angle-Math.PI/2);
		drawer.drawSeg(this.getCollisionWall());
	}

	getCollisionWall(): Seg {
		const delta=new Vec(this.length, 0).rotate(this.angle);
		return new Seg(this.getPosition().sub(delta), this.getPosition().add(delta), this.width);
	}

	getRenderOrder(): number {
		return 0.1;
	}
}

export default Wall;
