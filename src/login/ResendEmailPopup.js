//@flow strict

import * as React from 'react';
import Popup from 'reactjs-popup';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';

type Props = {||}; 

type State = {|
	email: string,
	message: string,
	popupOpen: boolean,
|};

class ResendEmailPopup extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			email: '',
			popupOpen: false,
			message: '',
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
					console.log(data.msg);
					console.log(data);
					this.setState({message: getErrorFromObject(data)});
				}
				else {
					console.log(data);
					this.setState({message: "Your verification email has been sent!"});
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
			<div>
				<button type="button" className="clearbtn" onClick={() => this.setState({popupOpen: true})}>
					Resend Confirmation Email
				</button>
				<Popup 
					open={this.state.popupOpen}
					onClose={() => this.handleCancelClick()}
				>
					<div className="popup">
						<div className="row col-md-12">
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
						<div className="fixedHeight">
							{this.state.message}
						</div>
						<div className="row col-md-12">
							{resendButton}
							{cancelButton}
						</div>
					</div>
				</Popup>
			</div>
		);
	}
}

export default ResendEmailPopup;
