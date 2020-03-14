//@flow strict

import Vec from '../casus/blocks/Vec.js';

class Seg {
	from: Vec;
	to: Vec;
	dir: Vec;

	constructor(from: Vec, to: Vec) {
		this.from=from;
		this.to=to;
		this.dir=to.sub(from);
	}

	getClosestTo(o: Vec): Vec {
		const percentThere: number = o.sub(this.from).dot(this.dir)/this.dir.mag2();
		return this.from.add(this.dir.scale(Math.max(0, Math.min(1, percentThere))));
	}

}

export default Seg;
