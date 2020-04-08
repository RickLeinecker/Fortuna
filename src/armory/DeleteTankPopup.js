//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import { ToastContainer, toast } from 'react-toastify';
import { deleteTank } from '../globalComponents/apiCalls/tankAPIIntegration.js';

type Props = {|
	tank: Tank;
|};

type State = {|
	deleteTankOpen: boolean
|};

class DeleteTankPopup extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);

		this.state = {
			deleteTankOpen: false,
		}
	}

	// Deletes the currently selected take after confirmation.
	handleDeleteClick(): void {
		deleteTank(this.props.tank._id, success => {
			if (success) {
				toast.success("Tank Deleted.");
				window.location.reload();
			}
			else {
				toast.error("Could not Delete Tank!");
			}
		});
	}

	render(): React.Node {
		const deleteButton = (
			<button className="popupbtn" onClick={() => this.handleDeleteClick()}>
				Delete
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.setState({deleteTankOpen: false})}>Cancel</button>
		);
		return(
			<div>
				<button className="smallbtn" onClick={() => this.setState({deleteTankOpen: true})}>
					Delete
				</button>
				<div className="deletePopup">
					<Popup
						open={this.state.deleteTankOpen}
						onClose={() => this.setState({deleteTankOpen: false})}
					>
						<div className="popup">
							<br/>
							<h4>Delete {this.props.tank.tankName}?</h4>
							{deleteButton}{cancelButton}
						</div>
					</Popup>
					<ToastContainer />
				</div>
			</div>
		);
	}
}

export default DeleteTankPopup;
