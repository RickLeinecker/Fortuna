//@flow strict

import Cookies from 'universal-cookie';

/*
	This function has no input
	This function returns a json object of the user
*/
function getUser(): Promise<Response> {
	const cookies = new Cookies();
	const responsePromise: Promise<Response> = fetch('/api/user/getUser/', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': cookies.get('token'),
		},
	});
	return responsePromise;
}

// Sets the user's wager according to the number passed to it.
// Returns a boolean indicating success (true) or failure (false). Maybe change to string to return the error.
function setWager(wager: number): boolean {
	const cookies = new Cookies();
	const responsePromise: Promise<Response> = fetch('/api/user/getUser/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': cookies.get('token'),
		},
		body: JSON.stringify({ wager: wager }),
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data.msg);
				console.log(data);
				return false;
			}
			else {
				return true;
			}
		})
	)
	// If the response failed, return false.
	return false;
}

export {getUser, setWager};
