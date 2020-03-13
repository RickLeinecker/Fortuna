//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import Cookies from 'universal-cookie';

type Props = {||}; 

type State = {|
	newTankName: string,
	errorMessage: string,
	newTankDialogOpen: boolean
|};

class CreateNewTankPopup extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
 			newTankName: '',
			errorMessage: '',
			newTankDialogOpen: false,
		}
    }
	
	//Creates a new tank
	handleCreateClick(): void {
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
			body: JSON.stringify({ tankName: this.state.newTankName }),
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
				<button type="button" className="primarybtn" onClick={() => this.setState({newTankDialogOpen: true})}>
					Create New Tank
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
