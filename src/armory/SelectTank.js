//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';

type Props = {|
	allTanks: Array<Tank>,
	changeSelectedTank: (Tank) => void,
|};

type State = {|
	showTanks: boolean,
	selectedTank: ?Tank
|};

class SelectTank extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			showTanks: false,
			selectedTank: props.allTanks[0],
		};
	}

	onChangeSelectedTank(selectedTank: Tank): void {
		this.props.changeSelectedTank(selectedTank);
		this.setState({
			selectedTank: selectedTank,
			showTanks: false
		});
	}

	componentDidUpdate(prevProps: Props) {
		if (this.props !== prevProps) {
			this.setState({selectedTank: this.props.allTanks[0]});
		}
	}

	render(): React.Node {
		return (
			<div>
				<button 
					className="tankListBtn" 
					onClick={() => this.setState({showTanks: true})}
				>
						{(this.state.selectedTank?.tankName??'loading tanks...')} 
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
						</div> :
						<div></div>
					}
				</div>
			</div>
		);
	}
}

export default SelectTank;
