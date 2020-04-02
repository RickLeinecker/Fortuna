//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { updateTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';

type Props = {|
	tank: Tank,
	// ONCE API IS REWORKED, THIS NEEDS TO BE REMOVED
	renameTank: (Tank) => void
|}; 

type State = {|
	newTankName: string,
	errorMessage: string,
	renameTankOpen: boolean
|};

class CreateNewTankPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		
		this.state = {
			newTankName: '',
			errorMessage: '',
			renameTankOpen: false
		}
    }
	
	// Renames the tank.
	handleRenameClick(): void {
		// Error handling.
		if(this.state.newTankName === '') {
			this.setState({errorMessage: 'Need to have a tank name.'});
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

		this.props.tank.tankName = this.state.newTankName;
		updateTank(this.props.tank, updateSuccessful => {
			if(updateSuccessful != null) {
				this.setState({newTankName: '', errorMessage: '', renameTankOpen: false});
				this.props.renameTank(this.props.tank);
			}
			else {
				this.setState({errorMessage: 'Could not rename tank.'});
			}
		});
	}

	render(): React.Node {
		const renameButton = (
			<button className="popupbtn" onClick={() => this.handleRenameClick()}>
				Rename
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({renameTankOpen: false})}>Cancel</button>
		);
		
		return (
			<div>
				<button className="smallbtn" onClick={() => this.setState({renameTankOpen: true})}>
					Rename
				</button>
				<label>&emsp;Rename Selected Tank</label>
				<Popup
					open={this.state.renameTankOpen}
					onClose={() => this.setState({renameTankOpen: false})}
				>
					<div className="popup">
						<label>Enter a New Name for {this.props.tank.tankName}</label>
						<input 
							type="text" 
							className="inputText" 
							onChange={e => this.setState({newTankName: e.target.value})} 
						/>
						<div className="fixedHeight">
							{this.state.errorMessage}
						</div>
						{renameButton}{cancelButton}
					</div>
				</Popup>
			</div>
		);
	}
}

export default CreateNewTankPopup;