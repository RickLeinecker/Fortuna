//@flow strict

import Vec from '../casus/blocks/Vec.js';

class Seg {
	from: Vec;
	to: Vec;
	dir: Vec;
	//used for things that are a segment but you can't get too close to it,
	//for example walls with nonzero width
	paddingWidth: number;

	constructor(from: Vec, to: Vec, paddingWidth: number = 0) {
		this.from=from;
		this.to=to;
		this.dir=to.sub(from);
		this.paddingWidth=paddingWidth;
	}

	getClosestTo(o: Vec): Vec {
		const percentThere: number = o.sub(this.from).dot(this.dir)/this.dir.mag2();
		return this.from.add(this.dir.scale(Math.max(0, Math.min(1, percentThere))));
	}

}

export default Seg;
