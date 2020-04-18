//@flow strict 

import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { verifyLink } from './verifyLink.js';

// Logs the user out and gives them a message for why they were logged out
function logoutUser(logoutMessage: string): void {

	// Delete All cookies. 
	const cookie = new Cookies();
	for(const cookieName of Object.keys(cookie.getAll())) {
		cookie.remove(cookieName);
	}
	window.location = verifyLink('/Login');
	toast.error(logoutMessage);
}

export {logoutUser};