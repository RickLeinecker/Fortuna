//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import Cookies from 'universal-cookie';
import Component from './Component.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';
import type { TankComponent } from './TankComponent.js';

type Props = {|
	chassis: Array<Component>,
	treads: Array<Component>,
|}; 

type State = {|
	selectedChassis: TankComponent,
	selectedTreads: TankComponent,
	newTankName: string,
	userId: string,
	errorMessage: string,
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
			errorMessage: '',
			newTankDialogOpen: false,
		}

		// Get the user ID for when a new tank is created.
		this.getUserId();
    }

	getUserId(): void {
		const responsePromise = getUser();

		responsePromise.then (
			response => response.json().then(data => {
				if(response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					this.setState({userId: data._id});
				}
			})
		)
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
			this.setState({errorMessage: 'Need to have a tank name.'});
			return;
		}
		else if(this.state.selectedChassis === 'empty' || this.state.selectedTreads === 'empty') {
			this.setState({errorMessage: 'Need to have a chassis and tread.'});
			return;
		}
		else if(this.state.newTankName.length > 20) {
			this.setState({errorMessage: 'Tank name needs to be 20 or less characters.'});
			return;
		}
		else if(this.state.newTankName.length < 3) {
			this.setState({errorMessage: 'Tank name needs to be 3 or more characters.'});
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

		const cookies = new Cookies();
		const responsePromise: Promise<Response> = fetch('/api/tank/assignTank', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': cookies.get('token'),
			},
			body: JSON.stringify({ tankName: this.state.newTankName, userId: this.state.userId, components: components }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					this.setState({errorMessage: getErrorFromObject(data)});
					return;
				}
				else {
					// If no errors, reload the page and the new tank will be set.
					window.location.reload();
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return;
			}
		);
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
				<h6>Create a New Tank</h6>
				<button type="button" className="btn" onClick={() => this.setState({newTankDialogOpen: true})}>
					Create
				</button>
				<Popup 
					open={this.state.newTankDialogOpen}
					onClose={() => this.setState({newTankDialogOpen: false})}
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

export default CreateNewTankPopup;
