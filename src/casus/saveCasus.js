//@flow strict

import getLoginToken from '../globalComponents/getLoginToken.js';
import getTankForCasus from '../globalComponents/getTankForCasus.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';

//just temporary until armory has been reworked and we can set this in armory
import setTankForCasus from '../globalComponents/setTankForCasus.js';

function saveCasus(casusCode: CasusBlock): void {
	//TODO: remove this as soon as armory has been refactored and we can set the selected tank there
	setTankForCasus('5e6c3139bee46d01aa7a80c7');

	const tankToEditID: string = getTankForCasus();
	const token=getLoginToken();
	
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
		}
		else {
			console.log('saved casus successfully!');
		}
	})
	.catch(e => {
		console.log('error saving casus!');
		console.log(e);
	});
}

export default saveCasus;
