//@flow strict

require('dotenv');

// Runtime check to pass Flow
if (process.env.REACT_APP_MASTER_ACCOUNT == null) throw new Error('Master Account Env Variable Missing');
const MASTER_ACCOUNT_ID: string = '5e93b1d0d1125f22ecd469b7';

function getMasterAccountId(): string {
	return MASTER_ACCOUNT_ID;
}

export default getMasterAccountId;
