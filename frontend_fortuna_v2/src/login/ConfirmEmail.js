//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';
import { verifyLink } from '../globalComponents/verifyLink.js';

type Props = {
	match: {
		params: {
			token: string,
			email: string,
		}
	}
}; 

type State = {|
	message: string,
|};


class ConfirmEmail extends React.Component<Props, State> {
	
	constructor() {
		super();
		this.state={
			message: ''
		}
	}

	componentDidMount() {
		this.confirmEmail();
	}

	confirmEmail(): void {
		const responsePromise: Promise<Response> = fetch('/api/user/confirmEmail', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ email: this.props.match.params.email , token: this.props.match.params.token}),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data);
					this.setState({message: getErrorFromObject(data)});
				}
				else {
					console.log(data);
					this.setState({message: "Confirmed!"});
				}
			})
		).catch(
			(error) => {
				console.log("Couldn't connect to server!");
				console.log(error);
			}
		);
	};

	render(): React.Node {
		return (
			<div className="background-image" title="confirm-page">
				<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<div className="confirm">
					<h5>{this.state.message}</h5>
					<br/>
					<Link to={verifyLink("/Login")}>
						<button className="primarybtn">Return to Login</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default ConfirmEmail;
