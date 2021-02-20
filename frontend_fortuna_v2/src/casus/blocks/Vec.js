//@flow strict

class Vec {
	x: number;
	y: number;

	constructor(x: number, y:number) {
		this.x=x;
		this.y=y;
	}

  getPoints() {
    return {
      X: this.x,
      Y: this.y
    }
  }

	add(o: Vec): Vec {
		return new Vec(this.x+o.x, this.y+o.y);
	}

	sub(o: Vec): Vec {
		return new Vec(this.x-o.x, this.y-o.y);
	}

	dot(o: Vec): number {
		return this.x*o.x+this.y*o.y;
	}

	cross(o: Vec): number {
		return this.x*o.y-this.y*o.x;
	}

	scale(s: number): Vec {
		return new Vec(this.x*s, this.y*s);
	}

	mag2(): number {
		return this.dot(this);
	}

	mag(): number {
		return Math.sqrt(this.mag2());
	}

	unit(): Vec {
		return this.scale(1/this.mag());
	}

	rotate(theta: number): Vec {
		const PI=Math.PI;
		const newX=this.x*Math.cos(theta)+this.y*Math.cos(PI/2+theta);
		const newY=this.x*Math.sin(theta)+this.y*Math.sin(PI/2+theta);
		return new Vec(newX, newY);
	}

	angle(): number{ 
		const TAU=Math.PI*2;
		const atan=Math.atan2(this.y, this.x);
		return (atan+TAU)%TAU;
	}

}

export default Vec;
