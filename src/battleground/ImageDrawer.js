//@flow strict

// A helper class for rendering images
import Vec from '../casus/blocks/Vec.js';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';

class ImageDrawer {
	ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx=ctx;
	}

	draw(i: Image, center: Vec, width: number, angle: number): void {
		const convertedPos = this._uncompressPosition(center);
		const convertedWidth = this._uncompressWidth(width);
		this._drawRaw(i, convertedPos.x, convertedPos.y, convertedWidth, angle);
	}

	_drawRaw(i: Image, xRaw:number, yRaw:number, width: number, angle: number): void {
		this.ctx.translate(xRaw, yRaw);
		this.ctx.rotate(angle);
		this.ctx.drawImage(i, -width/2, -width/2, width, width);
		this.ctx.rotate(-angle);
		this.ctx.translate(-xRaw, -yRaw);
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
