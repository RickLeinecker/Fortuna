
// start at beginning of wall and fill until when?

import { wallsForArena } from '../battleground/Battleground.js'
import Battleground from '../battleground/Battleground.js';
import Wall from '../battleground/Wall.js';
import Vec from '../casus/blocks/Vec.js';

//  const walls = {
// 	DIRT: [
// 		new Wall(new Vec(10, 0), 0, false),
// 		new Wall(new Vec(60, 0), Math.PI/2, false),
// 		new Wall(new Vec(-50, 30), Math.PI/5, false),
// 		new Wall(new Vec(-50, -30), -Math.PI/5, false),
// 	],
// 	HEX: [
// 		new Wall(new Vec(-30, 22), Math.PI/4, false),
// 		new Wall(new Vec(-30, -22), -Math.PI/4, false),
// 		new Wall(new Vec(30, 22), Math.PI*3/4, false),
// 		new Wall(new Vec(30, -22), -Math.PI*3/4, false),

// 		new Wall(new Vec(-75, 25), Math.PI/2, false),
// 		new Wall(new Vec(75, -25), -Math.PI/2, false),
// 	],
// 	LUNAR: [
// 		new Wall(new Vec(-100, -15), Math.PI*.45, true),
// 		new Wall(new Vec(-84, 60), Math.PI*-0.1, true),
// 		new Wall(new Vec(-14, -10), Math.PI*-0.2, true),
// 		new Wall(new Vec(55, -52), Math.PI*0.3, true),
// 		new Wall(new Vec(50, 40), Math.PI*0.43, true),
// 		new Wall(new Vec(125, -30), Math.PI*0.49, true),
// 	],
// 	CANDEN: [
// 		new Wall(new Vec(-115, 0), Math.PI*.5, true),
// 		new Wall(new Vec(115, 0), Math.PI*.5, true),
// 		new Wall(new Vec(0, 0), 0, true),
// 		new Wall(new Vec(0, 60), Math.PI*.5, true),
// 		new Wall(new Vec(0, -60), Math.PI*.5, true),
// 	],
// }

// export const calculateCoords = (arena) => {
//   switch(arena)
//   {
//     case 'DIRT':
//       return dirtGrid(arena);
//   }
// }

// // 
// { POSITION: this.position, -> vector: 
// ANGLE: this.angle, 
// WIDTH: this.width, 
// LENGTH: this.length }

export function calculateCoords(arena) {

  // this is an object
  var test = wallsForArena.DIRT[1].getWallCoords();

  // var test = { 
  //   POSITION: new Vec(10, 0),
  //   ANGLE: 0, 
  //   WIDTH: 3, 
  //   LENGTH: 17
  // }

  /* MID POINT FORMULA
      M = ( ((x1 + y2) / 2), ((y1 + y2) / 2) )

      we may need to use angle and width to get at least one point
      and then use the midpoint formula to get the other end point

  */

  // calculating endpoints

  // A[0]
  let topX = test.POSITION.x + ((test.LENGTH / 2) * Math.cos(test.ANGLE));
  // A[1]
  let topY = test.POSITION.y + ((test.LENGTH / 2) * Math.sin(test.ANGLE));

  // B[0]
  let bottomX = test.POSITION.x - ((test.LENGTH / 2) * Math.cos(test.ANGLE));
  // B[1]
  let bottomY = test.POSITION.y - ((test.LENGTH / 2) * Math.sin(test.ANGLE));


  const sign = (n) => {
    if (n > 0)
    {
      return 1;
    }
    else if (n < 0)
    {
      return -1;
    }
    else
    {
      return 0;
    }
  }

  // funky stuff
  let dx = (topX-bottomX);
  let dy = (topY-bottomY);

  let sx = sign(dx);
  let sy = sign(dy);

  // x
  let gridTopX = (Math.floor(topX))
  // y
  let gridTopY = (Math.floor(topY))

  let gridBotX = (Math.floor(bottomX))
  let gridBotY = (Math.floor(bottomY))

  let traversed = [{x: gridTopX, y: gridTopY}]

  let tIx = 0;
  let tIy = 0;

  if (dx != 0)
    tIx = dy * (gridTopX + sx - topX);
  else
    tIx = Number.POSITIVE_INFINITY;

  if (dy != 0)
    tIy = dx * (gridTopY + sy - topY);
  else
    tIy = Number.POSITIVE_INFINITY;

  
    while(gridTopX != gridBotX && gridTopY != gridBotY)
    {
      let movX = (tIx <= tIy);
      let movY = (tIy <= tIx);

      if (movX)
      {
        gridTopX += sx;
        tIx = dy * (gridTopY + sx - topX);
      }

      if (movY)
      {
        gridTopY += sy;
        tIy = dx * (gridTopY + sy - topY);
      }

      traversed.push({x: gridTopX, y: gridTopY});
    }

    return 0;

}

export function hexGrid(grid) {

}

export function lunarGrid(grid) {

}

export function candenGrid(grid) {

}