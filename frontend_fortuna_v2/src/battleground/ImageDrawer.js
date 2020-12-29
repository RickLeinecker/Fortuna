//@flow strict

// A helper class for rendering images
import Vec from '../casus/blocks/Vec.js';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import Seg from '../geometry/Seg.js';

class ImageDrawer {
	ctx: CanvasRenderingContext2D;
	position: Vec;
	zoomScale: number;
	getCanvasWidth: () => number;
	getCanvasHeight: () => number;
	gameWidth: number;

	constructor(
		ctx: CanvasRenderingContext2D,
		getCanvasWidth: () => number = getBattlegroundWidth,
		getCanvasHeight: () => number = getBattlegroundHeight,
		gameWidth: number = 200,
	) {
		this.ctx=ctx;
		this.position=new Vec(0, 0);
		this.zoomScale=1;
		this.gameWidth=gameWidth;
		this.getCanvasWidth=getCanvasWidth;
		this.getCanvasHeight=getCanvasHeight;
	}

	draw(i: Image, center: Vec, width: number, angle: number, alpha: number = 1.0, height: ?number=null): void {
		if (isNaN(center.x) || isNaN(center.y)) {
			throw new Error('Cant draw image at NaN! ');
		}
		const realHeight=height??width;
		const convertedPos = this._uncompressPosition(center.sub(this.position));
		const convertedWidth = this._uncompressWidth(width);
		const convertedHeight = this._uncompressWidth(realHeight);
		//ys are flipped, so the angle needs to be flipped too
		this._drawRaw(i, convertedPos.x, convertedPos.y, convertedWidth, -angle, alpha, convertedHeight);
	}

	drawSeg(s: Seg): void {
		const converted=new Seg(
			this._uncompressPosition(s.from.sub(this.position)), 
			this._uncompressPosition(s.to.sub(this.position))
		);
		this.ctx.strokeStyle = 'black';
		this.ctx.beginPath();
		this.ctx.moveTo(converted.from.x, converted.from.y);
		this.ctx.lineTo(converted.to.x, converted.to.y);
		this.ctx.stroke();
	}

	drawCircle(c: Vec, r: number): void {
		const convertedC=this._uncompressPosition(c.sub(this.position));
		const convertedR=this._uncompressWidth(r);
		this.ctx.strokeStyle = 'grey';
		this.ctx.beginPath();
		this.ctx.ellipse(convertedC.x, convertedC.y, convertedR, convertedR, 0, 0, Math.PI*2, true);
		this.ctx.stroke();
	}

	_drawRaw(
		i: Image, 
		xRaw:number, 
		yRaw:number, 
		width: number, 
		angle: number, 
		alpha: number, 
		height: number
	): void {
		const oldAlpha = this.ctx.globalAlpha;
		this.ctx.globalAlpha = alpha;
		this.ctx.translate(xRaw, yRaw);
		this.ctx.rotate(angle);
		this.ctx.drawImage(i, -width/2, -height/2, width, height);
		this.ctx.rotate(-angle);
		this.ctx.translate(-xRaw, -yRaw);
		this.ctx.globalAlpha = oldAlpha;
	}

	fillBlackRect(alpha: number) {
		const oldAlpha = this.ctx.globalAlpha;
		this.ctx.globalAlpha = alpha;
		this.ctx.fillStyle='black';
		this.ctx.fillRect(0, 0, 1000000, 1000000);
		this.ctx.globalAlpha = oldAlpha;
	}

	drawTitleText(text: string) {
		const oldFont=this.ctx.font;

		this.ctx.fillStyle='black';
		this.ctx.font='normal small-caps bold 120px arial';
		const width=this.ctx.measureText(text).width;
		this.ctx.fillText(text, this.getCanvasWidth()/2-width/2+5, this.getCanvasHeight()/4+5);

		this.ctx.fillStyle='white';
		this.ctx.fillText(text, this.getCanvasWidth()/2-width/2, this.getCanvasHeight()/4);

		this.ctx.font=oldFont;
	}
	
	drawTimeText(text: string) {
		const oldFont=this.ctx.font;

		this.ctx.fillStyle='black';
		this.ctx.font='normal small-caps 40px arial';
		const width=this.ctx.measureText(text).width;
		this.ctx.fillText(text, getBattlegroundWidth()*.95-width/2+2, getBattlegroundHeight()*.1+2);

		this.ctx.fillStyle='white';
		this.ctx.fillText(text, getBattlegroundWidth()*.95-width/2, getBattlegroundHeight()*.1);

		this.ctx.font=oldFont;
	}

	setCameraPosition(position: Vec) {
		this.position=position;
	}
	setZoomScale(zoomScale: number) {
		this.zoomScale=zoomScale;
	}

	//In compressed coordinates (the ones players see):
	//
	//	- center of screen is (0, 0)
	//	- x coordinates range from +/- 100
	//	- y coordinates range from +/- 60
	//	- up is positive y, right is positive x
	//
	_uncompressPosition(oldPosition: Vec): Vec {
		const positive=oldPosition;
		const scalar=this.getCanvasWidth()/this.gameWidth*this.zoomScale;
		const newX=positive.x*scalar;
		const newY=positive.y*scalar;
		return new Vec(newX, this.getCanvasHeight()-newY).add(
			new Vec(this.getCanvasWidth()/2, -this.getCanvasHeight()/2));
			//new Vec(0, 0));
	}

	_uncompressWidth(oldWidth: number): number {
		const scalar=this.getCanvasWidth()/this.gameWidth*this.zoomScale;
		return oldWidth*scalar;
	}

}

export default ImageDrawer;
