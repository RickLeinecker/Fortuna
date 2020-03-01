//@flow strict

// A helper class for rendering images
import Vec from '../casus/blocks/Vec.js';

class ImageDrawer {
	ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx=ctx;
	}

	draw(i: Image, center: Vec, width: number, angle: number) {
		this._drawRaw(i, center.x, center.y, width, angle);
	}

	_drawRaw(i: Image, xRaw:number, yRaw:number, width: number, angle: number) {
		this.ctx.translate(xRaw, yRaw);
		this.ctx.rotate(angle);
		this.ctx.drawImage(i, -width/2, -width/2, width, width);
		this.ctx.rotate(-angle);
		this.ctx.translate(-xRaw, -yRaw);
	}
}

export default ImageDrawer;
