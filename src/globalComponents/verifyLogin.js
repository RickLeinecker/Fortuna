//@flow strict

import { verifyLink } from './verifyLink.js';
import Cookies from 'universal-cookie';

function verifyLogin(): void {
	const cookies = new Cookies();
	const token = cookies.get('token');
	const responsePromise: Promise<Response> = fetch('/api/verify', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token,
		},
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data.msg);
				console.log(data);
				window.location = verifyLink('/Login');
				console.log('Login is not verified!');
			} else if(window.location.pathname === '/Login') {
				window.location = verifyLink('/MainMenu');
				console.log('At login and login is verified.');
			}
		})
	);
}

export { verifyLogin };