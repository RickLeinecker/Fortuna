//@flow strict

require('dotenv');

const MASTER_ACCOUNT_ID: string = process.env.REACT_APP_MASTER_SELLER;

function getMasterAccountId(): string {
	console.log(MASTER_ACCOUNT_ID);
	return MASTER_ACCOUNT_ID;
}

export default getMasterAccountId;
