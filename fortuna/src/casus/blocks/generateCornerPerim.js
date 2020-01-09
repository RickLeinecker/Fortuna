//@flow strict

import type {DataType} from './DataType.js';
import Vec from './Vec.js';
import BoundingBox from './BoundingBox.js';

const CENTER_WIDTH = 50;
const RAMP_WIDTH = 12;
const VPADDING = 3;
const HIGHLIGHT_STROKE_WIDTH = 5;
const BOARDER_STROKE_WIDTH = 1;

const EMPTY_STATEMENT_HEIGHT = 23;
const SET_VARIABLE_SET_WIDTH = 35;
const SET_VARIABLE_TO_WIDTH = 25;
const FOR_BLOCK_FOR_WIDTH = 35;
const FOR_BLOCK_SEMICOLON_WIDTH = 10;
const IF_BLOCK_IF_WIDTH = 25;
const WHILE_BLOCK_WHILE_WIDTH = 50;
const IF_ELSE_BLOCK_ELSE_WIDTH = 40;

const N_POINTS_TO_APROX_CIRCLE = 8;

function _generateBoolPerim(boundingBox: BoundingBox): Array<Vec> {
	const perim: Array<Vec> = [];
	perim.push(new Vec(boundingBox.x, boundingBox.y + boundingBox.h/2));
	perim.push(new Vec(boundingBox.x + RAMP_WIDTH, boundingBox.y));
	perim.push(new Vec(boundingBox.x + boundingBox.w - RAMP_WIDTH, boundingBox.y));
	perim.push(new Vec(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h/2));
	perim.push(new Vec(boundingBox.x + boundingBox.w - RAMP_WIDTH, boundingBox.y + boundingBox.h));
	perim.push(new Vec(boundingBox.x + RAMP_WIDTH, boundingBox.y + boundingBox.h));
	return perim;
}

function _generateIntPerim(boundingBox: BoundingBox): Array<Vec> {
	const perim: Array<Vec> = [];
	for (let i:number = -N_POINTS_TO_APROX_CIRCLE; i<=N_POINTS_TO_APROX_CIRCLE; i++) {
		const centerX = boundingBox.x+boundingBox.w-RAMP_WIDTH;
		const centerY = boundingBox.y+boundingBox.h/2;
		const angle = Math.PI/2 * i/N_POINTS_TO_APROX_CIRCLE;
		const xOffset = RAMP_WIDTH*Math.cos(angle);
		const yOffset = boundingBox.h/2*Math.sin(angle);
		
		perim.push(new Vec(centerX + xOffset, centerY + yOffset));
	}
	for (let i:number = -N_POINTS_TO_APROX_CIRCLE; i<=N_POINTS_TO_APROX_CIRCLE; i++) {
		const centerX = boundingBox.x+RAMP_WIDTH;
		const centerY = boundingBox.y+boundingBox.h/2;
		const angle = Math.PI/2 * i/N_POINTS_TO_APROX_CIRCLE + Math.PI;
		const xOffset = RAMP_WIDTH*Math.cos(angle);
		const yOffset = boundingBox.h/2*Math.sin(angle);
		
		perim.push(new Vec(centerX + xOffset, centerY + yOffset));
	}
	return perim;
}

function _generateDoublePerim(boundingBox: BoundingBox): Array<Vec> {
	const perim: Array<Vec> = [];
	perim.push(new Vec(boundingBox.x+boundingBox.w, boundingBox.y));
	for (let i:number = 0; i<=N_POINTS_TO_APROX_CIRCLE; i++) {
		const centerX = boundingBox.x+boundingBox.w-RAMP_WIDTH;
		const centerY = boundingBox.y+boundingBox.h/2;
		const angle = Math.PI/2 * i/N_POINTS_TO_APROX_CIRCLE;
		const xOffset = RAMP_WIDTH*Math.cos(angle);
		const yOffset = boundingBox.h/2*Math.sin(angle);
		
		perim.push(new Vec(centerX + xOffset, centerY + yOffset));
	}

	perim.push(new Vec(boundingBox.x, boundingBox.y+boundingBox.h));
	for (let i:number = 0; i<=N_POINTS_TO_APROX_CIRCLE; i++) {
		const centerX = boundingBox.x+RAMP_WIDTH;
		const centerY = boundingBox.y+boundingBox.h/2;
		const angle = Math.PI/2 * i/N_POINTS_TO_APROX_CIRCLE + Math.PI;
		const xOffset = RAMP_WIDTH*Math.cos(angle);
		const yOffset = boundingBox.h/2*Math.sin(angle);
		
		perim.push(new Vec(centerX + xOffset, centerY + yOffset));
	}
	return perim;
}

function _generateVoidPerim(boundingBox: BoundingBox): Array<Vec> {
	const perim: Array<Vec> = [];
	perim.push(new Vec(boundingBox.x, boundingBox.y));
	perim.push(new Vec(boundingBox.x + boundingBox.w, boundingBox.y));
	perim.push(new Vec(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h));
	perim.push(new Vec(boundingBox.x, boundingBox.y + boundingBox.h));
	return perim;
}

function generateCornerPerim(boundingBox: BoundingBox, dataType: DataType): Array<Vec> {
	if (dataType==='BOOLEAN') return _generateBoolPerim(boundingBox);
	if (dataType==='INT') return _generateIntPerim(boundingBox);
	if (dataType==='DOUBLE') return _generateDoublePerim(boundingBox);
	if (dataType==='VOID') return _generateVoidPerim(boundingBox);
	return [];
}

export {
	CENTER_WIDTH, 
	RAMP_WIDTH, 
	VPADDING, 
	HIGHLIGHT_STROKE_WIDTH,
	BOARDER_STROKE_WIDTH,
	EMPTY_STATEMENT_HEIGHT, 
	SET_VARIABLE_SET_WIDTH, 
	SET_VARIABLE_TO_WIDTH,
	FOR_BLOCK_FOR_WIDTH,
	FOR_BLOCK_SEMICOLON_WIDTH,
	IF_BLOCK_IF_WIDTH,
	WHILE_BLOCK_WHILE_WIDTH,
	IF_ELSE_BLOCK_ELSE_WIDTH
};
export default generateCornerPerim;

