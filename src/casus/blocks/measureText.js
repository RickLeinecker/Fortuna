//@flow strict

import BoundingBox from './BoundingBox';

const measuringCTX: CanvasRenderingContext2D=document.createElement('canvas').getContext('2d');

function measureText(text: string): BoundingBox {
	measuringCTX.font = '16px Arial';
	const bounds = measuringCTX.measureText(text);

	// this is a complete hack suggested here: 
	// https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
	const height = measuringCTX.measureText('M').width;

	return new BoundingBox(
		0, 
		0, 
		bounds.width, 
		height
	);
}

export default measureText;
