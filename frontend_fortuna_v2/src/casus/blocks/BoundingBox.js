//@flow strict

import Vec from './Vec.js';

class BoundingBox {
	x: number;
	y: number;
	w: number;
	h: number;

	constructor(x: number, y: number, w: number, h:number) {
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}

	contains(v: Vec): boolean {
		if (v.x<this.x|| v.y<this.y||v.x>this.x+this.w || v.y>this.y+this.h) {
			return false;
		}
		return true;
	}

}

export default BoundingBox;
