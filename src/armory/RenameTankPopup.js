//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { updateTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {|
	tank: Tank,
	renameTank: (Tank) => void
|}; 

type State = {|
	newTankName: string,
	renameTankOpen: boolean
|};

class CreateNewTankPopup extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		
		this.state = {
			newTankName: '',
			renameTankOpen: false
		}
    }
	
	// Renames the tank.
	handleRenameClick(): void {
		// Error handling.
		if(this.state.newTankName === '') {
			toast.error('Need to have a tank name.');
			return;
		}
		else if(this.state.newTankName.length > 20 || this.state.newTankName.length < 3) {
			toast.error('Tank name needs to be between 3 and 20 characters.');
			return;
		}

		this.props.tank.tankName = this.state.newTankName;
		updateTank(this.props.tank, () => {
			this.setState({newTankName: '', renameTankOpen: false});
			this.props.renameTank(this.props.tank);
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
						<br/>
						{renameButton}{cancelButton}
					</div>
				</Popup>
				<ToastContainer />
			</div>
		);
	}
}

export default CreateNewTankPopup;