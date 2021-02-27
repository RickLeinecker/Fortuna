import React from 'react'
import TankPart from './TankPart.js';
import { getImage } from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import Mine from '../battleground/gameobjects/Mine.js';
import C4 from '../battleground/gameobjects/C4.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import GameObject from '../battleground/GameObject.js';
import { createStaticParticle } from '../battleground/gameobjects/Particle.js';

import type { Range } from './Range.js';
import type { TankComponent } from '../globalComponents/typesAndClasses/TankComponent.js';
import Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';

import { calculateCoords } from '../tanks/grid.js'

import { wallsForArena } from '../battleground/Battleground.js'

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

export function rayTrace(wall) {
  // var test = wallsForArena.DIRT[1].getWallCoords();

  // calculating endpoints

  const xAngle = Math.cos(wall.ANGLE);
  const yAngle = Math.sin(wall.ANGLE);

  // A[0]
  let topX = (wall.POSITION.x + ((wall.LENGTH / 2) * xAngle));
  // A[1]
  let topY = (wall.POSITION.y + ((wall.LENGTH / 2) * yAngle));

  // B[0]
  let bottomX = (wall.POSITION.x - ((wall.LENGTH / 2) * xAngle))
  // B[1]
  let bottomY = (wall.POSITION.y - ((wall.LENGTH / 2) * yAngle))

  let a = {x: topX, y: topY};
  let b = {x: bottomX, y: bottomY};



  // RAY TRACE ALGORITHM BY DOMINIK: https://codepen.io/dominik-lach/pen/eYYBOXw
  let dx = b.x - a.x;
  let dy = b.y - a.y;

  let directionX = Math.sign(dx);
  let directionY = Math.sign(dy);
  let directionModifierX = directionX < 0 ? 0 : directionX;
  let directionModifierY = directionY < 0 ? 0 : directionY;

  let currentCell = {x: Math.floor(a.x), y: Math.floor(a.y)};
  let targetCell = {x: Math.floor(b.x), y: Math.floor(b.y)};

  let traversed = [{x: currentCell.x, y: currentCell.y}];

  let calcIntersectionDistanceX = () => Math.abs(dy * (currentCell.x + directionModifierX - a.x));
  let calcIntersectionDistanceY = () => Math.abs(dx * (currentCell.y + directionModifierY - a.y));

  let intersectionDistanceX = dx === 0 ? Infinity : calcIntersectionDistanceX();
  let intersectionDistanceY = dy === 0 ? Infinity : calcIntersectionDistanceY();

  while (targetCell.x !== currentCell.x || targetCell.y !== currentCell.y) {
      let xMove = intersectionDistanceX <= intersectionDistanceY;
      let yMove = intersectionDistanceY <= intersectionDistanceX;

      if (xMove) {
          currentCell.x += directionX;
          intersectionDistanceX = calcIntersectionDistanceX();
      }

      if (yMove) {
          currentCell.y += directionY;
          intersectionDistanceY = calcIntersectionDistanceY();
      }

      traversed.push({x: currentCell.x, y: currentCell.y});
  }

  return traversed;
}

export function fillGrid (walls) {
  
  // console.log("WALLS: ", walls[0].getWallCoords());

  let arrayOfCoords = [];

  console.log("length: ", walls.length)
  console.log("walls array: ", walls)

  for (let i = 0; i < walls.length; i++)
  {
    console.log("WALLS: ", walls[i].getWallCoords());
    let coords = rayTrace(walls[i].getWallCoords());
    arrayOfCoords.push(coords);
  }

  // for hex[1] with the negative angle, we want to add pi/2 to the negative to make it positive

  // arrayOfCoords.push(rayTrace(walls[2].getWallCoords()))

  return arrayOfCoords;
}

export function _aStar(wallsFromArena) {


    var gridArray = fillGrid(wallsForArena[wallsFromArena]);

    console.log("TESTING LOOP: ", gridArray);

    // areans have different sizes. Grid area needs to be dynamic
    // const arenaWidth: {[ArenaType]: number} = {
    //   DIRT: 200,
    //   HEX: 200,
    //   LUNAR: 300,
    //   CANDEN: 300,
    // }
    // const W = arenaWidth[arena]/2;
    // const H = W / 200*120;

    /*-------------------------------------------------------------------------------*/

    // var open = [], closed = [], start = position, goal = enemyTank, neighbors, path;

    // // for 2d array just array.push([val1, val2])
    // // but it is instantiated as 1d array
    // let grid = [];
    
    // console.log("test: ---> ", wallsForArena[testing])


    // let y = Battleground.H;
    // let x = Battleground.W;

    // let grid = new Array(x).fill(1).map(() => new Array(y).fill(1));

    // let grid = [];

    // for (let i = 0; i < y; i++)
    // {
    //   grid[i] = new Array(x).fill(1);
    // }

    // let test = calculateCoords('DIRT')
    

    // const fillGrid = () => {
    //   for (let i = 0; i < x; i++)
    //   {
    //     for (let j = 0; j <y; j++)
    //     { 
           
    //     }
    //   }
    // }

    // var astar = {
    //     init: function(grid) {
    //         for(var x = 0, xl = grid.length; x < xl; x++) {
    //             for(var y = 0, yl = grid[x].length; y < yl; y++) {
    //                 var node = grid[x][y];
    //                 node.f = 0;
    //                 node.g = 0;
    //                 node.h = 0;
    //                 node.cost = 1;
    //                 node.visited = false;
    //                 node.closed = false;
    //                 node.parent = null;
    //             }
    //         }
    //     },
    //     heap: function() {
    //         return new BinaryHeap(function(node) {
    //             return node.f;
    //         });
    //     },
    //     search: function(grid, start, end, diagonal, heuristic) {
    //         astar.init(grid);
    //         heuristic = heuristic || astar.manhattan;
    //         diagonal = !!diagonal;

    //         var openHeap = astar.heap();

    //         openHeap.push(start);

    //         while(openHeap.size() > 0) {

    //             // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    //             var currentNode = openHeap.pop();

    //             // End case -- result has been found, return the traced path.
    //             if(currentNode === end) {
    //                 var curr = currentNode;
    //                 var ret = [];
    //                 while(curr.parent) {
    //                     ret.push(curr);
    //                     curr = curr.parent;
    //                 }
    //                 return ret.reverse();
    //             }

    //             // Normal case -- move currentNode from open to closed, process each of its neighbors.
    //             currentNode.closed = true;

    //             // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
    //             var neighbors = astar.neighbors(grid, currentNode, diagonal);

    //             for(var i=0, il = neighbors.length; i < il; i++) {
    //                 var neighbor = neighbors[i];

    //                 if(neighbor.closed || neighbor.isWall()) {
    //                     // Not a valid node to process, skip to next neighbor.
    //                     continue;
    //                 }

    //                 // The g score is the shortest distance from start to current node.
    //                 // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
    //                 var gScore = currentNode.g + neighbor.cost;
    //                 var beenVisited = neighbor.visited;

    //                 if(!beenVisited || gScore < neighbor.g) {

    //                     // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
    //                     neighbor.visited = true;
    //                     neighbor.parent = currentNode;
    //                     neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
    //                     neighbor.g = gScore;
    //                     neighbor.f = neighbor.g + neighbor.h;

    //                     if (!beenVisited) {
    //                         // Pushing to heap will put it in proper place based on the 'f' value.
    //                         openHeap.push(neighbor);
    //                     }
    //                     else {
    //                         // Already seen the node, but since it has been rescored we need to reorder it in the heap
    //                         openHeap.rescoreElement(neighbor);
    //                     }
    //                 }
    //             }
    //         }

    //         // No result was found - empty array signifies failure to find path.
    //         return [];
    //     },
    //     manhattan: function(pos0, pos1) {
    //         // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

    //         var d1 = Math.abs (pos1.x - pos0.x);
    //         var d2 = Math.abs (pos1.y - pos0.y);
    //         return d1 + d2;
    //     },
    //     neighbors: function(grid, node, diagonals) {
    //         var ret = [];
    //         var x = node.x;
    //         var y = node.y;

    //         // West
    //         if(grid[x-1] && grid[x-1][y]) {
    //             ret.push(grid[x-1][y]);
    //         }

    //         // East
    //         if(grid[x+1] && grid[x+1][y]) {
    //             ret.push(grid[x+1][y]);
    //         }

    //         // South
    //         if(grid[x] && grid[x][y-1]) {
    //             ret.push(grid[x][y-1]);
    //         }

    //         // North
    //         if(grid[x] && grid[x][y+1]) {
    //             ret.push(grid[x][y+1]);
    //         }

    //         if (diagonals) {

    //             // Southwest
    //             if(grid[x-1] && grid[x-1][y-1]) {
    //                 ret.push(grid[x-1][y-1]);
    //             }

    //             // Southeast
    //             if(grid[x+1] && grid[x+1][y-1]) {
    //                 ret.push(grid[x+1][y-1]);
    //             }

    //             // Northwest
    //             if(grid[x-1] && grid[x-1][y+1]) {
    //                 ret.push(grid[x-1][y+1]);
    //             }

    //             // Northeast
    //             if(grid[x+1] && grid[x+1][y+1]) {
    //                 ret.push(grid[x+1][y+1]);
    //             }

    //         }
            

    //     }
    // };

    // console.log("W " + Battleground.W + " H " + Battleground.H);
    // console.log("test in astar: ", wallsForArena.DIRT[0].length);
    // console.log("TEST: ", test);
    // return ret;
}

export default _aStar
