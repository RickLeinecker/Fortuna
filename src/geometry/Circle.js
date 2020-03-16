//@flow strict

import Vec from '../casus/blocks/Vec.js';
import Seg from './Seg.js';

class Circle {
	c: Vec;
	r: number;
	constructor(c: Vec, r: number) {
		this.c=c;
		this.r=r;
	}

	intersectsSeg(seg: Seg): boolean {
		const closestPoint: Vec = seg.getClosestTo(this.c);
		const dist=closestPoint.sub(this.c).mag();
		return dist<=this.r;
	}

	intersectsCircle(circle: Circle): boolean {
		const dist=this.c.sub(circle.c).mag();
		return dist<=this.r+circle.r;
	}

}

export default Circle;
