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

	distanceTo(o: Vec | Seg): number {
		if (o instanceof Vec) {
			return this.getClosestTo(o).sub(o).mag();
		}
		else {
			//otherwise seg/seg distance
			if (this.intersects(o)) {
				return 0;
			}
			return Math.min(
				this.distanceTo(o.from),
				this.distanceTo(o.to),
				o.distanceTo(this.from),
				o.distanceTo(this.to)
			);
		}
	}

	//returns 1 if other point is above, 0 if on, -1 if below
	side(o: Vec): number {
		const oDir=o.sub(this.from);
		const distFromLine=this.dir.unit().cross(oDir);
		if (Math.abs(distFromLine)<1e-6) {
			return 0;
		}
		return Math.sign(distFromLine);
	}

	intersects(o: Seg): boolean {
		return this.side(o.from)!==this.side(o.to) && o.side(this.from)!==o.side(this.to);
	}

	lineIntersection(o: Seg): Vec {
		const det=o.dir.x*this.dir.y-this.dir.x*o.dir.y;
		//hope the determinant isn't zero because otherwise there are problems
		const dist=(o.dir.x*(o.from.y-this.from.y)-o.dir.y*(o.from.x-this.from.x))/det;
		return this.from.add(this.dir.scale(dist));
	}

}

export default Seg;
