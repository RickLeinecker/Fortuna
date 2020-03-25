//@flow strict

import * as React from 'react';
import "../Main.css";
import HealthBar from './HealthBar.js';

type Props = {||};

type State = {
};

class HealthBarsField extends React.Component<Props, State> {
	
	render(): React.Node {
		return (
			<div>
				<HealthBar 
					userName = "Player One" 
				/>
				<HealthBar 
					userName = "Player Two" 
				/>
			</div>
		);
	}
}

export default HealthBarsField;
