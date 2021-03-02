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

import { wallsForArena, arenaWidth } from '../battleground/Battleground.js'

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


  console.log('COORDS', arrayOfCoords)
  return arrayOfCoords;
}

function createGrid(arena, wallArrayCoords) {

  const W = (arenaWidth[arena]/2);
  const H = (W / 200*120);

  console.log(`Width: ${W} Height: ${H}`)

  let grid = new Array(H*2+1).fill(1).map(() => new Array(W*2+1).fill(1));

  for (let i = 0; i < wallArrayCoords.length; i++)
  {
    for (let j = 0; j < wallArrayCoords[i].length; j++)
    {
      let xCoord = wallArrayCoords[i][j].x + W;
      let yCoord = wallArrayCoords[i][j].y + H;

      grid[yCoord][xCoord] = -1;
    }
  }

  return grid;
}

export function _aStar(arena) {


    var wallArrayCoords = fillGrid(wallsForArena[arena]);

    var grid = createGrid(arena, wallArrayCoords)

    console.log("TESTING GRID: ", grid);


    var astar = {
      init: function(grid) {
        for(var x = 0; x < grid.length; x++) {
          for(var y = 0; y < grid[x].length; y++) {
            grid[x][y].f = 0;
            grid[x][y].g = 0;
            grid[x][y].h = 0;
            grid[x][y].debug = "";
            grid[x][y].parent = null;
          }  
        }
      },
      search: function(grid, start, end) {
        astar.init(grid);
     
        var openList   = [];
        var closedList = [];
        openList.push(start);
     
        while(openList.length > 0) {
     
          // Grab the lowest f(x) to process next
          var lowInd = 0;
          for(var i= 0; i<openList.length; i++) {
            if(openList[i].f < openList[lowInd].f) { lowInd = i; }
          }
          var currentNode = openList[lowInd];
     
          // End case -- result has been found, return the traced path
          if(currentNode.pos == end.pos) {
            var curr = currentNode;
            var ret = [];
            while(curr.parent) {
              ret.push(curr);
              curr = curr.parent;
            }
            return ret.reverse();
          }
     
          // Normal case -- move currentNode from open to closed, process each of its neighbors
          openList.removeGraphNode(currentNode);
          closedList.push(currentNode);
          var neighbors = astar.neighbors(grid, currentNode);
     
          for(var i=0; i<neighbors.length;i++) {
            var neighbor = neighbors[i];
            if(closedList.findGraphNode(neighbor) || neighbor.isWall()) {
              // not a valid node to process, skip to next neighbor
              continue;
            }
     
            // g score is the shortest distance from start to current node, we need to check if
            //   the path we have arrived at this neighbor is the shortest one we have seen yet
            var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
            var gScoreIsBest = false;
     
     
            if(!openList.findGraphNode(neighbor)) {
              // This the the first time we have arrived at this node, it must be the best
              // Also, we need to take the h (heuristic) score since we haven't done so yet
     
              gScoreIsBest = true;
              neighbor.h = astar.heuristic(neighbor.pos, end.pos);
              openList.push(neighbor);
            }
            else if(gScore < neighbor.g) {
              // We have already seen the node, but last time it had a worse g (distance from start)
              gScoreIsBest = true;
            }
     
            if(gScoreIsBest) {
              // Found an optimal (so far) path to this node.   Store info on how we got here and
              //  just how good it really is...
              neighbor.parent = currentNode;
              neighbor.g = gScore;
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
            }
          }
        }
     
        // No result was found -- empty array signifies failure to find path
        return [];
      },
      heuristic: function(pos0, pos1) {
        // This is the Manhattan distance
        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
      },
      neighbors: function(grid, node) {
        var ret = [];
        var x = node.pos.x;
        var y = node.pos.y;
     
        if(grid[x-1] && grid[x-1][y]) {
          ret.push(grid[x-1][y]);
        }
        if(grid[x+1] && grid[x+1][y]) {
          ret.push(grid[x+1][y]);
        }
        if(grid[x][y-1] && grid[x][y-1]) {
          ret.push(grid[x][y-1]);
        }
        if(grid[x][y+1] && grid[x][y+1]) {
          ret.push(grid[x][y+1]);
        }
        return ret;
      }
    };
};
    
    // console.log("W " + Battleground.W + " H " + Battleground.H);
    // console.log("test in astar: ", wallsForArena.DIRT[0].length);
    // console.log("TEST: ", test);
    // return ret;

export default _aStar
