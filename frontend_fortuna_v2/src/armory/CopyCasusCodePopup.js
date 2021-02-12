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
			toast.error("Please confirm you understand that you are overwriting code");
			return;
		}
		const selectedTank = this.props.selectedTank;
		const selectedCasusCode = this.state.tankBeingCopiedFrom.casusCode;
		saveCasus(selectedCasusCode, selectedTank._id, () => {
			toast.success("Copied Casus");
			this.setState({popupOpen: false});
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

	removeSelectedTankFromList(): Array<Tank> {
		const listOfTanksWithoutCurrentTank = [];
		for(let i = 0; i < this.props.usersTanks.length; i++) {
			if(this.props.usersTanks[i]._id !== this.props.selectedTank._id) {
				listOfTanksWithoutCurrentTank.push(this.props.usersTanks[i]);
			}
		}
		return listOfTanksWithoutCurrentTank;
	}

	render(): React.Node {
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({popupOpen: false})}>Cancel</button>
		);
		const copyButton = (this.state.confirmed === false || this.state.tankBeingCopiedFrom == null)?(<button className="smallbtn" disabled>Copy</button>):(<button className="smallbtn" onClick={() => this.copyCasusCode()}>Copy</button>);
		const checkBoxField = (
			<label>
				<input
					className = "customCheckBox"
					type="checkbox"
					checked={this.state.confirmed}
					onChange={() => this.changeConfirmed()} />
				 I understand I am overwriting {this.props.selectedTank.tankName}'s Casus Code 
			</label>
		)
		const listOfTanksWithoutCurrentTank = this.removeSelectedTankFromList();
		return(
			<div>
				<button className="btn" onClick={() => this.setState({popupOpen: true})}>
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
							{listOfTanksWithoutCurrentTank.map(tank => 
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