//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';

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

	handleDeleteClick(): void {
		const cookies = new Cookies();
		const responsePromise: Promise<Response> = fetch('/api/tank/deleteTank' + this.props.tank._id, {
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': cookies.get('token'),
			},
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
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
				<h6>Delete Selected Tank</h6>
				<button className="btn" onClick={() => this.setState({deleteTankOpen: true})}>
					Delete
				</button>
				<Popup
					open={this.state.deleteTankOpen}
					onClose={() => this.setState({deleteTankOpen: false})}
				>
					<div className="popup deletePopup">
						<h4>Delete {this.props.tank.tankName}?</h4>
						{deleteButton}{cancelButton}
					</div>
				</Popup>
			</div>
		);
	}
}

export default DeleteTankPopup;