//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';
import {getImage} from './ImageLoader.js';

import type {ImageName} from './ImageName.js';

import './HealthBar.css'

type Props = {|
	timeLeftText: string,
	fadeInAlpha: number,
	team1Tanks: Array<?Tank>,
	team2Tanks: Array<?Tank>,
|}

const WIDTH=1300;
const HEIGHT=100;
const LIGHT_BLUE='#04CCFF';

class HealthBar extends React.Component<Props> {

	componentDidUpdate(prevProps: Props) {
		if(this.props !== prevProps) {
			const canvas = this.refs.canvas;
			const ctx = canvas.getContext("2d");

			//draw background
			ctx.fillStyle='black';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.drawImage(getImage('HEALTHBAR_BACKGROUND'), 0, 0);

			//draw time text
			const oldFont=ctx.font;
			const text=this.props.timeLeftText;
			ctx.fillStyle='black';
			ctx.font='normal small-caps 80px arial';
			const width=ctx.measureText(text).width;
			ctx.fillText(text, WIDTH/2-width/2+4, HEIGHT*.8+4);
			ctx.fillStyle='#ddddee';
			ctx.fillText(text, WIDTH/2-width/2, HEIGHT*.8);
			ctx.font=oldFont;

			const teamOneNonnull: Array<Tank> = [];
			const teamTwoNonnull: Array<Tank> = [];
			for (const t: ?Tank of this.props.team1Tanks) {
				if (t!=null) {
					teamOneNonnull.push(t);
				}
			}
			for (const t: ?Tank of this.props.team2Tanks) {
				if (t!=null) {
					teamTwoNonnull.push(t);
				}
			}
			if (teamOneNonnull.length === 1 && teamTwoNonnull.length === 1) {
				this.draw1V1Healthbars(ctx, teamOneNonnull[0], teamTwoNonnull[0]);
			}
			else {
				this.draw3v3Healthbars(ctx, teamOneNonnull, teamTwoNonnull);
			}

			//draw black intro curtain
			const oldAlpha=ctx.globalAlpha;
			ctx.globalAlpha=this.props.fadeInAlpha;
			ctx.fillStyle='black';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.globalAlpha=oldAlpha;
		}
	}

	draw1V1Healthbars(ctx: CanvasRenderingContext2D, tank1: Tank, tank2: Tank): void {
		if (tank1==null || tank2==null) {
			return;
		}
		// draw tank names
		const oldFont=ctx.font;
		const MAX_NAME_WIDTH=WIDTH*.19;
		let fontSize=30;
		ctx.font='normal small-caps 30px arial';
		while (ctx.measureText(tank1?.tankName??'').width>MAX_NAME_WIDTH) {
			fontSize--;
			ctx.font='normal small-caps '+fontSize+'px arial';
		}

		let text=tank1?.tankName??'';
		ctx.fillStyle='black';
		let width=ctx.measureText(text).width;
		ctx.fillText(text, WIDTH/80+2, HEIGHT*.4+2);
		ctx.fillStyle=LIGHT_BLUE;
		ctx.fillText(text, WIDTH/80, HEIGHT*.4);

		fontSize=30;
		ctx.font='normal small-caps 30px arial';
		while (ctx.measureText(tank2?.tankName??'').width>MAX_NAME_WIDTH) {
			fontSize--;
			ctx.font='normal small-caps '+fontSize+'px arial';
		}
		text=tank2?.tankName??'';
		ctx.fillStyle='black';
		width=ctx.measureText(text).width;
		ctx.fillText(text, WIDTH-WIDTH/80-width+2, HEIGHT*.4+2);
		ctx.fillStyle=LIGHT_BLUE;
		ctx.fillText(text, WIDTH-WIDTH/80-width, HEIGHT*.4);

		ctx.font=oldFont;
		// end draw tank names

		// draw actual health bars
		ctx.fillStyle='#030915';
		const BAR_WIDTH=WIDTH/3;
		ctx.fillRect(WIDTH/80, HEIGHT*.55, BAR_WIDTH, HEIGHT*.3);
		ctx.fillRect(WIDTH-WIDTH/80-BAR_WIDTH, HEIGHT*.55, BAR_WIDTH, HEIGHT*.3);
		ctx.fillStyle=LIGHT_BLUE;
		const percent1=Math.max(0, tank1.getHealth()/tank1._getArmorOffset());
		const percent2=Math.max(0, tank2.getHealth()/tank2._getArmorOffset());
		const BORDER=4;
		const SMALL_WIDTH=BAR_WIDTH-2*BORDER;
		const SMALL_HEIGHT=HEIGHT*.3-2*BORDER;
		ctx.fillRect(WIDTH/80+BORDER, HEIGHT*.55+BORDER, SMALL_WIDTH*percent1, SMALL_HEIGHT);
		const SMALL_WIDTH2=SMALL_WIDTH*percent2;
		ctx.fillRect(WIDTH-WIDTH/80-BORDER-SMALL_WIDTH2, HEIGHT*.55+BORDER, SMALL_WIDTH2, SMALL_HEIGHT);
		// end draw actual health bars
		
		//draw items for each tank
		const playerOneItems: Array<ImageName> = [];
		if (tank1.haveC4) {
			playerOneItems.push('C4');
		}
		for (let i=0; i<tank1.minesLeft; i++) {
			playerOneItems.push('MINE');
		}
		if (tank1.haveNitroRepair) {
			playerOneItems.push('GREEN_PARTICLE');
		}
		if (tank1.haveOverdrive) {
			playerOneItems.push('EMBER1');
		}
		if (tank1.haveMissileTracker) {
			playerOneItems.push('MISSILE_TRACKER_DART');
		}
		const ICON_WIDTH=30;
		let curX=WIDTH*.20
		const curY=HEIGHT*.15;
		for (const item of playerOneItems) {
			ctx.drawImage(getImage(item), curX, curY, ICON_WIDTH, ICON_WIDTH);
			curX+=ICON_WIDTH*1.5;
		}

		const playerTwoItems: Array<ImageName> = [];
		if (tank2.haveC4) {
			playerTwoItems.push('C4');
		}
		for (let i=0; i<tank1.minesLeft; i++) {
			playerTwoItems.push('MINE');
		}
		if (tank2.haveNitroRepair) {
			playerTwoItems.push('GREEN_PARTICLE');
		}
		if (tank2.haveOverdrive) {
			playerTwoItems.push('EMBER1');
		}
		if (tank2.haveMissileTracker) {
			playerTwoItems.push('MISSILE_TRACKER_DART');
		}
		curX=WIDTH-WIDTH*.20
		for (const item of playerTwoItems) {
			ctx.drawImage(getImage(item), curX-ICON_WIDTH, curY, ICON_WIDTH, ICON_WIDTH);
			curX-=ICON_WIDTH*1.5;
		}
		//end draw items for each tank
		
		//draw warnings
		const WARNING_WIDTH=70;
		if (tank1.getHitInstructionsLimit()) {
			ctx.drawImage(getImage('TOO_MANY_INSTRUCTIONS'), WIDTH*0.35, HEIGHT*.2, WARNING_WIDTH, WARNING_WIDTH);
		}
		if (tank1.getHitRecursionLimit()) {
			ctx.drawImage(getImage('RECURSION_TOO_DEEP'), WIDTH*0.395, HEIGHT*.2, WARNING_WIDTH, WARNING_WIDTH);
		}
		if (tank2.getHitInstructionsLimit()) {
			ctx.drawImage(
				getImage('TOO_MANY_INSTRUCTIONS'), 
				WIDTH-WIDTH*0.35-WARNING_WIDTH, 
				HEIGHT*.2, 
				WARNING_WIDTH, 
				WARNING_WIDTH
			);
		}
		if (tank2.getHitRecursionLimit()) {
			ctx.drawImage(
				getImage('RECURSION_TOO_DEEP'), 
				WIDTH-WIDTH*0.395-WARNING_WIDTH, 
				HEIGHT*.2, 
				WARNING_WIDTH, 
				WARNING_WIDTH);
		}
		//end draw warnings
		
		//draw jammed static
		if (tank1.isJammed()) {
			const oldAlpha=ctx.globalAlpha;
			ctx.globalAlpha=0.8;
			const STATIC_WIDTH=520;
			const STATIC_HEIGHT=100;	
			ctx.drawImage(getImage('JAMMED'), 0, 0, STATIC_WIDTH, STATIC_HEIGHT);
			ctx.fillStyle='#222222';
			ctx.font='bold small-caps 90px arial';
			ctx.globalAlpha=1;
			ctx.fillText("JAMMED", WIDTH*.05, HEIGHT*.84);
			ctx.globalAlpha=oldAlpha;
		}
		if (tank2.isJammed()) {
			const oldAlpha=ctx.globalAlpha;
			ctx.globalAlpha=0.8;
			const STATIC_WIDTH=520;
			const STATIC_HEIGHT=100;	
			ctx.drawImage(getImage('JAMMED'), WIDTH-STATIC_WIDTH, HEIGHT-STATIC_HEIGHT, STATIC_WIDTH, STATIC_HEIGHT);
			ctx.fillStyle='#222222';
			ctx.font='bold small-caps 90px arial';
			ctx.globalAlpha=1;
			const JAMMED_WIDTH=ctx.measureText("JAMMED").width;
			ctx.fillText("JAMMED", WIDTH-WIDTH*.05-JAMMED_WIDTH, HEIGHT*.84);
			ctx.globalAlpha=oldAlpha;
		}
		//end draw jammed static
	}

	draw3v3Healthbars(ctx: CanvasRenderingContext2D, team1Tanks: Array<Tank>, team2Tanks: Array<Tank>): void {
		let curY=HEIGHT*.11;
		for (const tank: Tank of team1Tanks) {
			//draw healthbar
			ctx.fillStyle='#030915';
			const BAR_WIDTH=WIDTH*.2;
			const BAR_HEIGHT=HEIGHT*.2;
			ctx.fillRect(WIDTH*.23, curY, BAR_WIDTH, BAR_HEIGHT);
			ctx.fillStyle=LIGHT_BLUE;
			const percent1=Math.max(0, tank.getHealth()/tank._getArmorOffset());
			const BORDER=4;
			const SMALL_WIDTH=BAR_WIDTH-2*BORDER;
			const SMALL_HEIGHT=BAR_HEIGHT-2*BORDER;
			ctx.fillRect(WIDTH*.23+BORDER, curY+BORDER, SMALL_WIDTH*percent1, SMALL_HEIGHT);
			//end draw health bar
			
			//draw tank name
			const oldFont=ctx.font;
			const MAX_NAME_WIDTH=WIDTH*.1;
			let fontSize=20;
			ctx.font='normal small-caps 20px arial';
			while (ctx.measureText(tank.tankName).width>MAX_NAME_WIDTH) {
				fontSize--;
				ctx.font='normal small-caps '+fontSize+'px arial';
			}

			const TEXT_WIDTH=ctx.measureText(tank.tankName).width;
			let text=tank?.tankName??'';
			ctx.fillStyle='black';
			ctx.fillText(text, WIDTH*.22-TEXT_WIDTH, curY+BAR_HEIGHT*.6+2);
			ctx.fillStyle=LIGHT_BLUE;
			ctx.fillText(text, WIDTH*.22-TEXT_WIDTH, curY+BAR_HEIGHT*.6);

			ctx.font=oldFont;
			//end draw tank name

			//draw warnings
			const WARNING_WIDTH=30;
			if (tank.getHitInstructionsLimit()) {
				ctx.drawImage(
					getImage('TOO_MANY_INSTRUCTIONS'), 
					WIDTH*.005, 
					curY-HEIGHT*0.06, 
					WARNING_WIDTH, 
					WARNING_WIDTH
				);
			}
			if (tank.getHitRecursionLimit()) {
				ctx.drawImage(
					getImage('RECURSION_TOO_DEEP'), 
					WIDTH*0.033, 
					curY-HEIGHT*0.06, 
					WARNING_WIDTH, 
					WARNING_WIDTH
				);
			}
			//end draw warnings
			
			//draw item icons
			const itemsOwned: Array<ImageName> = [];
			if (tank.haveC4) {
				itemsOwned.push('C4');
			}
			for (let i=0; i<tank.minesLeft; i++) {
				itemsOwned.push('MINE');
			}
			if (tank.haveNitroRepair) {
				itemsOwned.push('GREEN_PARTICLE');
			}
			if (tank.haveOverdrive) {
				itemsOwned.push('EMBER1');
			}
			if (tank.haveMissileTracker) {
				itemsOwned.push('MISSILE_TRACKER_DART');
			}
			const ICON_WIDTH=20;
			let curX=WIDTH*.11
			for (const item of itemsOwned) {
				ctx.drawImage(getImage(item), curX, curY, ICON_WIDTH, ICON_WIDTH);
				curX-=ICON_WIDTH*1.1;
			}
			//end draw item icons
			
			curY+=HEIGHT*0.3;
		}


		//Now the same thing, but for the other team!
		curY=HEIGHT*.11;
		for (const tank: Tank of team2Tanks) {
			//draw healthbar
			ctx.fillStyle='#030915';
			const BAR_WIDTH=WIDTH*.2;
			const BAR_HEIGHT=HEIGHT*.2;
			ctx.fillRect(WIDTH-WIDTH*.23-BAR_WIDTH, curY, BAR_WIDTH, BAR_HEIGHT);
			ctx.fillStyle=LIGHT_BLUE;
			const percent1=Math.max(0, tank.getHealth()/tank._getArmorOffset());
			const BORDER=4;
			const SMALL_WIDTH=BAR_WIDTH-2*BORDER;
			const SMALL_HEIGHT=BAR_HEIGHT-2*BORDER;
			ctx.fillRect(WIDTH-WIDTH*.23-SMALL_WIDTH*percent1-BORDER, curY+BORDER, SMALL_WIDTH*percent1, SMALL_HEIGHT);
			//end draw health bar
			
			//draw tank name
			const oldFont=ctx.font;
			const MAX_NAME_WIDTH=WIDTH*.1;
			let fontSize=20;
			ctx.font='normal small-caps 20px arial';
			while (ctx.measureText(tank.tankName).width>MAX_NAME_WIDTH) {
				fontSize--;
				ctx.font='normal small-caps '+fontSize+'px arial';
			}

			let text=tank?.tankName??'';
			ctx.fillStyle='black';
			ctx.fillText(text, WIDTH-WIDTH*.22, curY+BAR_HEIGHT*.6+2);
			ctx.fillStyle=LIGHT_BLUE;
			ctx.fillText(text, WIDTH-WIDTH*.22, curY+BAR_HEIGHT*.6);

			ctx.font=oldFont;
			//end draw tank name

			//draw warnings
			const WARNING_WIDTH=30;
			if (tank.getHitInstructionsLimit()) {
				ctx.drawImage(
					getImage('TOO_MANY_INSTRUCTIONS'), 
					WIDTH-WARNING_WIDTH-WIDTH*.005, 
					curY-HEIGHT*0.06, 
					WARNING_WIDTH, 
					WARNING_WIDTH
				);
			}
			if (tank.getHitRecursionLimit()) {
				ctx.drawImage(
					getImage('RECURSION_TOO_DEEP'), 
					WIDTH-WARNING_WIDTH-WIDTH*0.033, 
					curY-HEIGHT*0.06, 
					WARNING_WIDTH, 
					WARNING_WIDTH
				);
			}
			//end draw warnings
			
			//draw item icons
			const itemsOwned: Array<ImageName> = [];
			if (tank.haveC4) {
				itemsOwned.push('C4');
			}
			for (let i=0; i<tank.minesLeft; i++) {
				itemsOwned.push('MINE');
			}
			if (tank.haveNitroRepair) {
				itemsOwned.push('GREEN_PARTICLE');
			}
			if (tank.haveOverdrive) {
				itemsOwned.push('EMBER1');
			}
			if (tank.haveMissileTracker) {
				itemsOwned.push('MISSILE_TRACKER_DART');
			}
			const ICON_WIDTH=20;
			let curX=WIDTH*.11
			for (const item of itemsOwned) {
				ctx.drawImage(getImage(item), WIDTH-ICON_WIDTH-curX, curY, ICON_WIDTH, ICON_WIDTH);
				curX-=ICON_WIDTH*1.1;
			}
			//end draw item icons
			
			curY+=HEIGHT*0.3;
		}
	}

	render(): React.Node {
		return (
			<div className = "inline">
				<canvas
					className="healthBarCanvas inline"
					ref="canvas"
					width={WIDTH}
					height={HEIGHT}
				/>
			</div>
		);
	}
}

export default HealthBar;
