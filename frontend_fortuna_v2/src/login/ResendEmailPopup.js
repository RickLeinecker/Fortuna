//@flow strict

import * as React from 'react';
import './Login.css';
import Popup from 'reactjs-popup';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import { ToastContainer , toast } from 'react-toastify';

type Props = {||};

type State = {|
	email: string,
	popupOpen:boolean,
|};

class ResendEmailPopup extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			email: '',
			popupOpen: false,
		}
	}

	handleResendClick(): void {
		const responsePromise: Promise<Response> = fetch('/api/user/resendConfirm', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ email: this.state.email }),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data);
					toast.error(getErrorFromObject(data));
				}
				else {
					console.log(data);
					toast.success("Your reconfirmation email has been sent!");
					this.setState({popupOpen: false});
				}
			})
		).catch(
			(error) => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	handleCancelClick(): void {
		this.setState({popupOpen: false});
	}

	render(): React.Node {
		const resendButton = (
			<button className="popupbtn" onClick={() => this.handleResendClick()}>
				Resend Email
			</button>
		);
		const cancelButton = (
			<button className="cancelbtn" onClick={() => this.handleCancelClick()}>Cancel</button>
		);

		return (
			<div data-testid="resendEmail">
				<button style={{ paddingLeft: 0, marginTop: 40 }} type="button" className="clearbtn" onClick={() => this.setState({popupOpen: true})}>
					<div>
						Resend Confirmation Email
					</div>
				</button>
				<Popup
					open={this.state.popupOpen}
					onClose={() => this.handleCancelClick()}
				>
					<div className="popup">
						<h3>Resend Email Verification</h3>
						<div >
							<label>Email</label>
							<div className="input-group">
								<input
									type="text"
									className="inputText"
									name="email"
									value={this.state.email}
									onChange={e => this.setState({ email: e.target.value})}
								/>
							</div>
						</div>
						<div >
							{resendButton}
							{cancelButton}
						</div>
					</div>
				</Popup>
				<ToastContainer />
			</div>
		);
	}
}

export default ResendEmailPopup;
