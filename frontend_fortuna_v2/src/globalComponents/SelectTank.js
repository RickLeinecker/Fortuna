//@flow strict

import * as React from 'react';
import Tank from '../tanks/Tank.js';
import setPreferredSelectedTank from '../globalComponents/setPreferredSelectedTank.js';

type Props = {|
	allTanks: Array<Tank>,
	changeSelectedTank: (?Tank) => void,
	selectedTank: ?Tank,
	propogateChangesToCasus: boolean,
	allowRemoveTank: boolean
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

	componentDidUpdate(prevProps: Props): void {
		if (prevProps !== this.props && 
			this.props.selectedTank!=null && 
			this.props.propogateChangesToCasus && 
			prevProps.selectedTank !== this.props.selectedTank
		) {
			const setTo=this.props.selectedTank;
			if (setTo!=null) {
				setPreferredSelectedTank(this.props.selectedTank);
			}
		}
	}

	onChangeSelectedTank(selectedTank: ?Tank): void {
		if (selectedTank!=null && this.props.propogateChangesToCasus) {
			setPreferredSelectedTank(selectedTank);
		}
		this.props.changeSelectedTank(selectedTank);
		this.setState({
			showTanks: false
		});
	}

  h6Style = {
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
  }

	render(): React.Node {
		return (
			<div>
				<button 
					className={(this.state.showTanks) ? "tankListBtn selectedTank" : "tankListBtn"}
					onClick={() => this.setState({showTanks: true})}
				>
						{(this.props.selectedTank?.tankName??'No Tank Selected')} 
				</button>
				<div>
					{(this.state.showTanks) ?
						<div className="tankList">
							<h6 style={this.h6Style}>Select a Tank</h6>
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
							{this.props.allowRemoveTank ?
								<button className="removeTankBtn" onClick={() => this.onChangeSelectedTank(null)}>
									Remove Tank
								</button> :
								<div></div>
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
