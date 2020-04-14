//@flow strict

import getLoginToken from '../globalComponents/getLoginToken.js';
import getTankForCasus from '../globalComponents/getTankForCasus.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';
import { toast } from 'react-toastify';

function saveCasus(casusCode: ContainerBlock): void {
	
	const tankToEditID: string = getTankForCasus();
	const token=getLoginToken();
	if (casusCode.children.length===0) {
		console.log('Tried to save empty, so we will ignore that...');
		return;
	}
	
	fetch('/api/tank/casusUpdate/'+tankToEditID, {
		method: 'PUT',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
		},
		body: JSON.stringify({
			casusCode: casusCode
		})
	})
	.then(res => {
		if (res.status !== 200) {
			console.log('Got unexpected status response when saving casus!');
			console.log(res);
			toast.error("Couldn't save Casus code");
		}
	})
	.catch(e => {
		console.log('error saving casus!');
		toast.error("Couldn't save Casus code");
		console.log(e);
	});
}

export default saveCasus;
