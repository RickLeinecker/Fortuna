//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Tank from '../tanks/Tank.js';
import getLoginToken from '../globalComponents/getLoginToken.js';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer , toast } from 'react-toastify';

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
		const responsePromise: Promise<Response> = fetch('/api/tank/deleteTank/' + this.props.tank._id, {
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': getLoginToken()
			},
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					toast.error(data.msg);
					console.log(data);
					return;
				}
				else {
					// If no errors, reload the page and the tank will be deleted.
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
				<label>&emsp;Delete Selected Tank</label>
				<div className="deletePopup">
					<Popup
						open={this.state.deleteTankOpen}
						onClose={() => this.setState({deleteTankOpen: false})}
					>
						<div className="popup">
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
