//@flow strict

import getLoginToken from '../globalComponents/getLoginToken.js';
import getTankForCasus from '../globalComponents/getTankForCasus.js';
import ContainerBlock from './blocks/ContainerBlock.js';
import reviveCasusBlock from './reviveCasusBlock.js';

//just temporary until armory has been reworked and we can set this in armory
import setTankForCasus from '../globalComponents/setTankForCasus.js';

function loadCasus(onBlocksLoaded: (casusBlock: ContainerBlock) => void): void {
	//TODO: remove this as soon as armory has been refactored and we can set the selected tank there
	//setTankForCasus('5e6ad69007161134094ad003');
	setTankForCasus('5e6ad7f507161134094ad004');

	const targetTankId=getTankForCasus();
	const token=getLoginToken();
	console.log('Loading casus...');
	fetch('/api/tank/userTanks', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
		}
	})
	.then((res: Response) => {
		if (res.status !== 200) {
			console.log('Got unexpected status response when saving casus!');
			console.log(res);
		}
		else {
			res.json().then(data => {
				const tank=data.find(cand => cand._id === targetTankId);
				if (tank == null) {
					console.log('Couldnt find selected tank. Perhaps it was sold or deleted?');
					console.log(data);
					console.log(targetTankId);
					return;
				}
				if (tank.casusCode == null) {
					console.log('Casus blocks returned as null. Might just not have been set up yet?');
					onBlocksLoaded(new ContainerBlock());
					return;
				}
				let revived=reviveCasusBlock(tank.casusCode);
				console.log('Recieved blocks.');
				console.log(revived);
				onBlocksLoaded(revived);
			});
		}
	})
	.catch(e => {
		console.log('error saving casus!');
		console.log(e);
	});
}

export default loadCasus;
