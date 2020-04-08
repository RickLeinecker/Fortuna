//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBar from './HealthBar.js';
import Navbar from '../globalComponents/Navbar.js';
import Tank from '../tanks/Tank.js';
import DebugLog from './DebugLog.js';
import getReturnToFromBattlegroundLink from './getReturnToFromBattlegroundLink.js';

import './BattlegroundContainer.css';

type Props = {||};

type State = {|
	playerOneTank: ?Tank,
	playerTwoTank: ?Tank,
	debugLines: Array<string>,
	timeLeftText: string,
	fadeInAlpha: number,
|};

const MAX_DEBUG_LINES=30;

class BattlegroundContainer extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			playerOneTank: null,
			playerTwoTank : null,
			debugLines: [],
			timeLeftText: '',
			fadeInAlpha: 1,
		}
	}

	render(): React.Node {
		const battleground=(
			<Battleground 
				setPlayersTank = {this.setPlayersTank}
				setTimeLeftText = {this.setTimeLeftText}
				addDebugLine = {this.addDebugLine}
				setFadeInAlpha = {this.setFadeInAlpha}
			/>
		);
		const returnTo=getReturnToFromBattlegroundLink();
		const haveDebug=this.state.debugLines.length!==0;
		return (
			<div>
				<Navbar
					linkName={returnTo}
					returnName='Exit Early'
					pageName='Battleground'
				/>
				<div className={haveDebug?'battlegroundContainer':'battlegroundContainerFull'}>
					<HealthBar
						tank1 = {this.state.playerOneTank}
						tank2 = {this.state.playerTwoTank}
						timeLeftText = {this.state.timeLeftText}
						fadeInAlpha = {this.state.fadeInAlpha}
					/>
					<div className={haveDebug?'debugAndBattleContainer':'debugAndBattleContainerFull'}>
						{battleground}
						{haveDebug?
							<DebugLog debugLines={this.state.debugLines}/>:
							<div></div>
						}
					</div>
				</div>
			</div>
		);
	}

	setPlayersTank = (playerOneTank: Tank, playerTwoTank: Tank): void  => {
		this.setState({
			playerOneTank: playerOneTank,
			playerTwoTank: playerTwoTank
		});
	}

	setTimeLeftText = (timeLeft: string): void  => {
		this.setState({
			timeLeftText: timeLeft
		});
	}
	
	setFadeInAlpha = (fadeInAlpha: number): void => {
		this.setState({
			fadeInAlpha: fadeInAlpha
		});
	}

	addDebugLine = (line: string): void => {
		const newDebugLines=this.state.debugLines.concat(line);
		while (newDebugLines.length>MAX_DEBUG_LINES) {
			newDebugLines.shift();
		}
		this.setState({
			debugLines: newDebugLines,
		});
	}
}

export default BattlegroundContainer;
