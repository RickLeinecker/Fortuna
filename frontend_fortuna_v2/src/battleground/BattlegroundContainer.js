//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBar from './HealthBar.js';
import MainNavbar from '../globalComponents/MainNavbar.js';
import Tank from '../tanks/Tank.js';
import DebugLog from './DebugLog.js';
import getReturnToFromBattlegroundLink from './getReturnToFromBattlegroundLink.js';

import './BattlegroundContainer.css';

type Props = {||};

type State = {|
	debugLines: Array<string>,
	timeLeftText: string,
	fadeInAlpha: number,
	teamOneTanks: Array<?Tank>,
	teamTwoTanks: Array<?Tank>,
|};

const MAX_DEBUG_LINES=30;

class BattlegroundContainer extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			debugLines: [],
			timeLeftText: '',
			fadeInAlpha: 1,
			teamOneTanks: [],
			teamTwoTanks: [],
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
			<div id="Parent" className='background-image'>
				<MainNavbar
					linkName={returnTo}
					returnName='Exit Early'
					pageName='Battleground'
				/>
				<div className={haveDebug?'battlegroundContainer':'battlegroundContainerFull'}>
					<HealthBar
						timeLeftText = {this.state.timeLeftText}
						fadeInAlpha = {this.state.fadeInAlpha}
						team1Tanks = {this.state.teamOneTanks}
						team2Tanks = {this.state.teamTwoTanks}
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

	setPlayersTank = (teamOneTanks: Array<?Tank>, teamTwoTanks: Array<?Tank>): void  => {
		this.setState({
			teamOneTanks: teamOneTanks,
			teamTwoTanks: teamTwoTanks
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
