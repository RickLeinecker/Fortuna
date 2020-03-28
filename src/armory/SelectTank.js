//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';

type Props = {|
	allTanks: Array<Tank>,
	showTanks: boolean,
	changeSelectedTank: (string) => void,
|};

type State = {||};

class SelectTank extends React.Component<Props, State> {

	render(): React.Node {
		return (
			<div>
				{(this.props.showTanks) ?
					<div className="tankList">
						<h6>Select a New Tank to Edit</h6>
						{this.props.allTanks.map(({tankName, _id}) => ({tankName, _id})).map(({tankName, _id}, index) =>
							<div key={index}>
								<button className="tankListBtn" onClick={() => this.props.changeSelectedTank(_id)}>{tankName}</button>
								<br/>
							</div>
						)}
					</div> :
					<div></div>
				}
			</div>
		);
	}
}

export default SelectTank;