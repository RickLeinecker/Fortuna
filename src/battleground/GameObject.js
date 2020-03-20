//@flow strict 

import type ImageDrawer from './ImageDrawer.js';
import type Battleground from './Battleground.js';

//a simple class that can be implemented for objects that need to be rendered in the game
//Override the following methods if you need them:
//
// update(Battleground): called once every fram
//
// render(ImageDrawer): draw yourself
//
// getRenderOrder(): returns the order that things should be rendered in

class GameObject {

	update(battleground: Battleground): void {
	}

	render(drawer: ImageDrawer): void {
	}

	getRenderOrder(): number {
		return 0;
	}
}

export default GameObject;
