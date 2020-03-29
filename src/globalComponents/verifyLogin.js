//@flow strict

import { verifyLink } from './verifyLink.js';
import getLoginToken from './getLoginToken.js';

function verifyLogin(): void {
	const responsePromise: Promise<Response> = fetch('/api/verify', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken(),
		},
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200 && window.location.pathname !== '/Login') {
				console.log(response.status);
				console.log(data.msg);
				console.log(data);
				window.location = verifyLink('/Login');
			} else if(response.status === 200 && (window.location.pathname === '/Login' || window.location.pathname === '/')) {
				window.location = verifyLink('/MainMenu');
			}
		})
	);
}

export { verifyLogin };
