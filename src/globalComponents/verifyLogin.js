//@flow strict

import Cookies from 'universal-cookie';
import LinkType from './LinkType.js';


function verifyLogin(linkName: LinkType): LinkType {
	
	// Checks if the user is logged in. 
	// All Links go to login if no token is found.
	const cookie = new Cookies();
	if(cookie.get('token')) {
		return linkName;
	}
	else {
		return "Login";
	}
}

export {verifyLogin};