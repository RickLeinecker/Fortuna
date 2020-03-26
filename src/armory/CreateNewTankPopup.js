//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import Cookies from 'universal-cookie';
import Component from './Component.js';
import { getUser } from '../globalComponents/userAPIIntegration.js';

type Props = {|
	chassis: Array<Component>,
	scanners: Array<Component>,
	treads: Array<Component>,
|}; 

type State = {|
	selectedChassis: string,
	selectedScanner: string,
	selectedTreads: string,
	newTankName: string,
	userId: string,
	errorMessage: string,
	newTankDialogOpen: boolean,
|};

class CreateNewTankPopup extends React.Component<Props, State> {

	constructor() {
		super();
		
		this.state = {
			selectedChassis: '',
			selectedScanner: '',
			selectedTreads: '',
 			newTankName: '',
			userId: '',
			errorMessage: '',
			newTankDialogOpen: false,
		}
		
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
		// Check for undefined strings.
		if(str == null) {
			return '';
		}

		let newStr = str.replace( /([A-Z])/g, " $1");
		return newStr.charAt(0).toUpperCase() + newStr.slice(1);
	}
	
	//Creates a new tank
	handleCreateClick(): void {

		if(this.state.newTankName === '') {
			this.setState({errorMessage: 'Need to have a tank name!'});
			return;
		}

		// Create components array.
		let components: Array<?string> = [];
		// components will be an array of 11 values:
		// [0] = Chassis
		// [1] = Main Gun, [2] = Secondary Gun
		// [3] = Scanner, [4] = Scanner Addon 1, [5] = Scanner Addon 2
		// [6] = Jammer
		// [7] = Treads
		// [8] = Item 1, [9] = Item 2, [10] = Item 3
		// If they do not have a component in a slot, it is set to null.
		for(let i: number = 0; i < 11; i++) {
			switch(i) {
				case 0:
					components.push(this.state.selectedChassis);
					break;
				case 3:
					components.push(this.state.selectedScanner);
					break;
				case 7:
					components.push(this.state.selectedTreads);
					break;
				default:
					components.push(null);
					break;
			}
		}

		const cookies = new Cookies();
		const token = cookies.get('token');
		const responsePromise: Promise<Response> = fetch('/api/tank/assignTank', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': token
			},
			body: JSON.stringify({ tankName: this.state.newTankName, components: components, userId: this.state.userId }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				console.log(data);
				if (response.status !== 201) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					this.setState({errorMessage: getErrorFromObject(data)});
				}
				else {
					console.log(data);
					window.location.reload();
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};
    
	handleCancelClick(): void {
		this.setState({newTankDialogOpen: false});
	};

	render(): React.Node {
		const createButton = (
			<button className="popupbtn" onClick={() => this.handleCreateClick()}>
				Create New Tank
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.handleCancelClick()}>Cancel</button>
		);
		
		return (
			<div>
				<h6>Create a New Tank</h6>
				<button type="button" className="btn" onClick={() => this.setState({newTankDialogOpen: true})}>
					Create
				</button>
				<Popup 
					open={this.state.newTankDialogOpen}
					onClose={() => this.handleCancelClick()}
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
									{this.props.chassis.map(({componentName, numberOwned}, index) => (
										<option key={index} value={componentName}>{this.toTitleCase(componentName)} {numberOwned}</option>
									))}
								</select>
							</div>
							<label>New Tank Scanner</label>
							<div className="input-group">
								<select className="dropdownMenu" onChange={(e) => this.setState({selectedScanner: e.target.value})}>
									{this.props.scanners.map(({componentName, numberOwned}, index) => (
										<option key={index} value={componentName}>{this.toTitleCase(componentName)} {numberOwned}</option>
									))}
								</select>
							</div>
							<label>New Tank Treads</label>
							<div className="input-group">
								<select className="dropdownMenu" onChange={(e) => this.setState({selectedTreads: e.target.value})}>
									{this.props.treads.map(({componentName, numberOwned}, index) => (
										<option key={index} value={componentName}>{this.toTitleCase(componentName)} {numberOwned}</option>
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
