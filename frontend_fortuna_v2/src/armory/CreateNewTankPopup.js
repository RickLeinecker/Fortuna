//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Component from '../globalComponents/typesAndClasses/Component.js';
import getUserAPICall from '../globalComponents/apiCalls/getUserAPICall.js';
import type { TankComponent } from '../globalComponents/typesAndClasses/TankComponent.js';
import { ToastContainer , toast } from 'react-toastify';
import { createTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import Tank from '../tanks/Tank.js';
import { getTank, getEmptyCasusCode } from '../tanks/TankLoader.js';
import BackendTank from '../tanks/BackendTank.js';

type Props = {|
	chassis: Array<Component>,
	treads: Array<Component>,
|}; 

type State = {|
	selectedChassis: TankComponent,
	selectedTreads: TankComponent,
	newTankName: string,
	userId: string,
	newTankDialogOpen: boolean,
|};

class CreateNewTankPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		
		this.state = {
			selectedChassis: 'empty',
			selectedTreads: 'empty',
 			newTankName: '',
			userId: '',
			newTankDialogOpen: false,
		}
    }

	// Once mounted, set the userId.
	componentDidMount(): void {
		getUserAPICall(user => {
			this.setState({userId: user.userId});
		});
	}

	// Converts camel case to title case.
	toTitleCase(str: string): string {
		let newStr = str.replace( /([A-Z])/g, " $1");
		return newStr.charAt(0).toUpperCase() + newStr.slice(1);
	}
	
	//Creates a new tank
	handleCreateClick(): void {
		// Error handling.
		if(this.state.newTankName === '') {
			toast.error('Need to have a tank name.');
			return;
		}
		else if(this.state.selectedChassis === 'empty' || this.state.selectedTreads === 'empty') {
			toast.error('Need to have a chassis and treads.');
			return;
		}
		else if(this.state.newTankName.length > 20 || this.state.newTankName.length < 3) {
			toast.error('Tank name needs to be between 3 and 20 characters.');
			return;
		}

		// Create components array.
		let components: Array<TankComponent> = [];
		// Index 0 and 7 are used for the chassis and treads that the user chooses.
		// The rest are set to 'empty'.
		for(let i: number = 0; i < 11; i++) {
			switch(i) {
				case 0:
					components.push(this.state.selectedChassis);
					break;
				case 7:
					components.push(this.state.selectedTreads);
					break;
				default:
					components.push('empty');
					break;
			}
		}

		const newTank: Tank = getTank(new BackendTank(
			'',
			components,
			getEmptyCasusCode(),
			false,
			this.state.userId,
			this.state.newTankName
		));
		createTank(newTank, () => {
			window.location.reload();
		});
	}

	render(): React.Node {
		const createButton = (
			<button className="popupbtn" onClick={() => this.handleCreateClick()}>
				Create
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({newTankDialogOpen: false})}>Cancel</button>
		);
		
		return (
			<div>
				<button className="marketBtnSm" onClick={() => this.setState({newTankDialogOpen: true})}>
					Create
				</button>
				<Popup 
					open={this.state.newTankDialogOpen}
					onClose={() => this.setState({newTankDialogOpen: false})}
				>
					<div className="popup">
						<div>
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
						<br/>
						<div>
							{createButton}
							{cancelButton}
						</div>
					</div>
				</Popup>
				<ToastContainer />
			</div>
		);
	}
}

export default CreateNewTankPopup;
