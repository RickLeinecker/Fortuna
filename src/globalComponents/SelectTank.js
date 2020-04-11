//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';

type Props = {|
	allTanks: Array<Tank>,
	changeSelectedTank: (?Tank) => void,
	selectedTank: ?Tank,
|};

type State = {|
	showTanks: boolean,
|};

class SelectTank extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			showTanks: false,
		};
	}

	onChangeSelectedTank(selectedTank: ?Tank): void {
		this.props.changeSelectedTank(selectedTank);
		this.setState({
			showTanks: false
		});
	}

	render(): React.Node {
		return (
			<div>
				<button 
					className={(this.state.showTanks) ? "tankListBtn selectedTank" : "tankListBtn"}
					onClick={() => this.setState({showTanks: true})}
				>
						{(this.props.selectedTank?.tankName??'No Selected Tank')} 
				</button>
				<div>
					{(this.state.showTanks) ?
						<div className="tankList">
							<h6>Select a Tank</h6>
							{this.props.allTanks.map(tank => 
								<div key={tank._id}>
									<button 
										className="tankListBtn" 
										onClick={() => this.onChangeSelectedTank(tank)}
									>
										{tank.tankName}
									</button>
									<br/>
								</div>
							)}
							{window.location.pathname === '/Armory' ? <div></div> :
								<button className="removeTankBtn" onClick={() => this.onChangeSelectedTank(null)}>
									Remove Tank
								</button>
							}
						</div> :
						<div></div>
					}
				</div>
			</div>
		);
	}
}

export default SelectTank;
