//@flow strict
import * as React from 'react';
import { getUser } from '../globalComponents/apiCalls/userAPIIntegration.js';
import { ToastContainer , toast } from 'react-toastify';
import { getUsersCurrentSales } from './marketPlaceAPIConnections.js';

type Props = {|
	onItemSold: () => void,
|}; 

type State = {|
	userId: string,
|};

class RemoveASaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
		}
		this.getUserID();
	}

	//this gets the user id
	getUserID() : void {
		const responsePromise = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					const jsonObjectOfUser = data;
					//set the users id
					this.setState({userId:jsonObjectOfUser._id});
					//this gets the users current sales
					this.getUsersCurrentSales();
				}
			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	//This gets the users current sales
	getUsersCurrentSales() : void {
		const responsePromise = getUsersCurrentSales(this.state.userId);
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
				}
				else {
					console.log(data);
				}
			})
		).catch(
			error => {
				toast.error('Couldnt connect to server!');
				console.log(error);
			}
		);
	};
	
	render(): React.Node  { 
		return (
			<div id="Parent">
				<h1>Here to remove sales!</h1>
				<ToastContainer />
			</div>
		);
	}
}

export default RemoveASaleView;
