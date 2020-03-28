//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';

type Props = {|
	wagerTank: Tank,
|};

type State = {|
	userCurrency: number,
	userWager: number,
	setWagerOpen: boolean,
|};

class SetWagerPopup extends React.Copmonent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			userCurrency: 0,
			userWager: 0,
			setWagerOpen: false,
		}
	}

	render(): React.Node {
		return (
			<div>
				<label>Setup a Wager&emsp;</label>
				<button className="smallbtn" onClick={() => this.setState({setWagerOpen: true})}>
					Setup
				</button>
				<Popup 
					open={this.state.setWagerOpen}
					onClose={() => this.setState({setWagerOpen: false})}
				>
					<div className="popup">
						<div className="row col-md-12">
							<label>New Tank Name</label>
							<div className="input-group">
								<input 
									type="text" 
									className="inputText" 
									name="newTankName" 
									value={this.state.newTankName} 
									onChange={e => this.setState({ newTankName: e.target.value})} 
								/>
							</div>
							<label>New Tank Chassis</label>
							<div className="input-group">
								<select className="dropdownMenu" onChange={(e) => this.setState({selectedChassis: e.target.value})}>
									<option value={this.state.selectedChassis}>{this.toTitleCase(this.state.selectedChassis)}</option>
									{this.props.chassis.map(({componentName, numberOwned}, index) => (
										<option key={index} value={componentName}>{this.toTitleCase(componentName)}</option>
									))}
								</select>
							</div>
							<label>New Tank Treads</label>
							<div className="input-group">
								<select className="dropdownMenu" onChange={(e) => this.setState({selectedTreads: e.target.value})}>
									<option value={this.state.selectedTreads}>{this.toTitleCase(this.state.selectedTreads)}</option>
									{this.props.treads.map(({componentName, numberOwned}, index) => (
										<option key={index} value={componentName}>{this.toTitleCase(componentName)}</option>
									))}
								</select>
							</div>
						</div>
						<div className="fixedHeight">
							{this.state.errorMessage}
						</div>
						<div className="row col-md-12">
							{createButton}
							{cancelButton}
						</div>
					</div>
				</Popup>
			</div>
		);
	}
}

export default SetWagerPopup;