//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';

//gets the user when passed a token stored as the login token
function getAllUsersAPICall(onLoad:(allUsers: Array<User>) => void) {
	const token=getLoginToken();
	const responsePromise: Promise<Response> = fetch('/api/user/allUsers', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
		},
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data.msg);
			}
			else {
				const allUsers=[];
				for (const backendUser of data) {
					const user=new User(
						backendUser.userName, 
						backendUser.money, 
						backendUser.wager,
						backendUser._id,
						backendUser.stats.elo,
					);
					allUsers.push(user);
				}
				onLoad(allUsers);
			}
		})
	);
}


export default getAllUsersAPICall;
