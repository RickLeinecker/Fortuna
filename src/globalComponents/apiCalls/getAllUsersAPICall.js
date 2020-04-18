//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';
import { getInventory } from '../GetInventoryInfo.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';
import { logoutUser } from '../logoutUser.js';

//gets the user when passed a token stored as the login token
function getAllUsersAPICall(onLoad:(allUsers: Array<User>) => void) {
	const responsePromise: Promise<Response> = fetch('/api/user/allUsers', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status === 400) {
				logoutUser("Authentication issue. Please login again");
			}
			else if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				toast.error(getErrorFromObject(data));
			}
			else {
				const allUsers=[];
				for (const backendUser of data) {
					const user = new User(
						backendUser.userName, 
						backendUser.money, 
						backendUser.wager,
						backendUser.wager3v3,
						backendUser._id,
						backendUser.stats.elo,
						getInventory(backendUser.inventory.tankComponents)
					);
					allUsers.push(user);
				}
				onLoad(allUsers);
			}
		})
	);
}


export default getAllUsersAPICall;
