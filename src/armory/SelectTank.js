//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';

type Props = {|
	allTanks: Array<Tank>;
	changeSelectedTank: (string) => void;
|};

type State = {||};

class SelectTank extends React.Component<Props, State> {

	render(): React.Node {
		return (
			<div>
				{this.props.allTanks.map(({tankName, _id}) => ({tankName, _id})).map(({tankName, _id}, index) =>
						<button key={index} className="componentMenuBtn">{tankName}</button>
				)}
			</div>
		);
	}
}

export default SelectTank;