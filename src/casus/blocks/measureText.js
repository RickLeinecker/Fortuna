//@flow strict

import BoundingBox from './BoundingBox';

const measuringCTX: CanvasRenderingContext2D=document.createElement('canvas').getContext('2d');

function measureText(text: string): BoundingBox {
	measuringCTX.font = '16px Arial';
	const bounds = measuringCTX.measureText(text);
	return new BoundingBox(
		0, 
		0, 
		bounds.width, 
		bounds.fontBoundingBoxAscent+bounds.fontBoundingBoxDescent
	);
}

export default measureText;
