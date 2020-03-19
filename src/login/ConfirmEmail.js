//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import getErrorFromObject from '../globalComponents/getErrorFromObject.js';

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
					this.setState({message: "Confirmed! Please go to our login page and login"});
				}
			})
		).catch(
			(error) => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	render(): React.Node {
		return (
			<div className="confirmPage">
				<h3>{this.state.message}</h3>
				<Link to="/Login">
					<button className="clearbtn">Click here to go to Login</button>
				</Link>
			</div>
		);
	}
}

export default ConfirmEmail;
