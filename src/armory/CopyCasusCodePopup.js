//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { ToastContainer , toast } from 'react-toastify';
import saveCasus from '../casus/saveCasus.js';

type Props = {|
	selectedTank: Tank,
	usersTanks: Array<Tank>,
|};

type State = {|
	popupOpen: boolean,
	tankBeingCopiedFrom: ?Tank,
	confirmed: boolean,
|};

class CopyCasusCodePopup extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);

		this.state = {
			popupOpen: false,
			tankBeingCopiedFrom : null,
			confirmed: false,
		}
	}

	setTankBeingCopiedFrom(tankBeingUsedId: string): void {
		this.setState({tankBeingCopiedFrom: this.props.usersTanks.find(tank => tank._id === tankBeingUsedId)});
	}

	copyCasusCode(): void {
		if(this.state.tankBeingCopiedFrom == null) {
			toast.error("Couldn't find this tank");
			return;
		}
		if(this.state.confirmed === false) {
			toast.error("Please confirm you understand that you are rewriting code");
			return;
		}
		const selectedTank = this.props.selectedTank;
		const selectedCasusCode = this.state.tankBeingCopiedFrom.casusCode;
		saveCasus(selectedCasusCode, selectedTank._id, () => {
			toast.success("Copied Casus");
		});		
	}

	changeConfirmed(): void {
		if(this.state.confirmed) {
			this.setState({confirmed: false});
		}
		else {
			this.setState({confirmed: true});
		}
	}

	render(): React.Node {
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({popupOpen: false})}>Cancel</button>
		);
		const copyButton = (
			<button className="smallbtn" onClick={() => this.copyCasusCode()}>Copy</button>
		);
		const checkBoxField = (
			<label>
				<input
					className = "customCheckBox"
					type="checkbox"
					checked={this.state.confirmed}
					onChange={() => this.changeConfirmed()} />
				 I understand I am rewritting {this.props.selectedTank.tankName}'s Casus Code 
			</label>
		)
		return(
			<div>
				<button className="primarybtn" onClick={() => this.setState({popupOpen: true})}>
					Copy Code
				</button>
				<Popup
					open={this.state.popupOpen}
					onClose={() => this.setState({popupOpen: false})}
				>
					<div className="popup">
						<br/>
						<h3>Copy Casus Code From</h3>
						<select 
							className="dropdownMenu" 
							onChange={e => this.setTankBeingCopiedFrom(e.target.value)}
						>
							<option>Select A Tank To Copy From</option>
							{this.props.usersTanks.map(tank => 
								<option key = {tank._id} value = {tank._id}>{tank.tankName}</option>
							)}
						</select>
						{checkBoxField}
						<br/>
						{copyButton}{cancelButton}
					</div>
				</Popup>
				<ToastContainer />
			</div>
		);
	}
}

export default CopyCasusCodePopup;