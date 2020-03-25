//@flow strict

import * as React from 'react';
import Battleground from './Battleground.js';
import HealthBarsField from './HealthBarsField.js';
import Navbar from '../globalComponents/Navbar.js';
import "../Main.css";

type Props = {||};

type State = {
};

class BattleGroundContainer extends React.Component<Props, State> {

	render(): React.Node {
		return (
			<div className="haveScorebarIfSmall">
				<Navbar
					linkName='BattleArena'
					returnName='Back to Battle Arena'
					pageName='Battleground'
				/>
				<HealthBarsField />
				<Battleground />
			</div>
		);
	}
}

export default BattleGroundContainer;
