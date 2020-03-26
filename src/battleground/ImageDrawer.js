//@flow strict

// A helper class for rendering images
import Vec from '../casus/blocks/Vec.js';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import Seg from '../geometry/Seg.js';

class ImageDrawer {
	ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx=ctx;
	}

	draw(i: Image, center: Vec, width: number, angle: number, alpha: number = 1.0): void {
		if (isNaN(center.x) || isNaN(center.y)) {
			throw new Error('Cant draw image at NaN! ');
		}
		const convertedPos = this._uncompressPosition(center);
		const convertedWidth = this._uncompressWidth(width);
		//ys are flipped, so the angle needs to be flipped too
		this._drawRaw(i, convertedPos.x, convertedPos.y, convertedWidth, -angle, alpha);
	}

	drawSeg(s: Seg): void {
		const converted=new Seg(this._uncompressPosition(s.from), this._uncompressPosition(s.to));
		this.ctx.strokeStyle = 'black';
		this.ctx.beginPath();
		this.ctx.moveTo(converted.from.x, converted.from.y);
		this.ctx.lineTo(converted.to.x, converted.to.y);
		this.ctx.stroke();
	}

	drawCircle(c: Vec, r: number): void {
		const convertedC=this._uncompressPosition(c);
		const convertedR=this._uncompressWidth(r);
		this.ctx.strokeStyle = 'grey';
		this.ctx.beginPath();
		this.ctx.ellipse(convertedC.x, convertedC.y, convertedR, convertedR, 0, 0, Math.PI*2, true);
		this.ctx.stroke();
	}

	_drawRaw(i: Image, xRaw:number, yRaw:number, width: number, angle: number, alpha: number): void {
		const oldAlpha = this.ctx.globalAlpha;
		this.ctx.globalAlpha = alpha;
		this.ctx.translate(xRaw, yRaw);
		this.ctx.rotate(angle);
		this.ctx.drawImage(i, -width/2, -width/2, width, width);
		this.ctx.rotate(-angle);
		this.ctx.translate(-xRaw, -yRaw);
		this.ctx.globalAlpha = oldAlpha;
	}

	//In compressed coordinates (the ones players see):
	//
	//	- center of screen is (0, 0)
	//	- x coordinates range from +/- 100
	//	- y coordinates range from +/- 60
	//	- up is positive y, right is positive x
	//
	_uncompressPosition(oldPosition: Vec): Vec {
		const positive=oldPosition.add(new Vec(100, 60));
		const scalar=getBattlegroundWidth()/200.0;
		const newX=positive.x*scalar;
		const newY=positive.y*scalar;
		return new Vec(newX, getBattlegroundHeight()-newY);
	}

	_uncompressWidth(oldWidth: number): number {
		const scalar=getBattlegroundWidth()/200.0;
		return oldWidth*scalar;
	}

}

export default ImageDrawer;
