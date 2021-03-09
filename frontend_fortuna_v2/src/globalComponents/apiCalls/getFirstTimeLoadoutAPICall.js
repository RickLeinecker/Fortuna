//@flow strict

import getLoginToken from '../getLoginToken.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//gets the user when passed a token stored as the login token
function getFirstTimeLoadoutAPICall(onLoad:(firstTimeLoadout: Boolean) => void) {
    const token=getLoginToken();
    console.log('checking if this is the first time the user has visited the Loadout page...');
    const responsePromise: Promise<Response> = fetch('/api/user/getFirstTimeLoadout', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'x-auth-token': token
        },
    });
    responsePromise.then(
        response => response.json().then(data => {
            if (response.status !== 200) {
                console.log(response.status);
                console.log(data);

                toast.error(getErrorFromObject(data));
            }
            else {
                const firstTimeStatus = data
                console.log('returned first time status for Loadout page: ');
                console.log(firstTimeStatus);
                onLoad(firstTimeStatus);
            }
        })
    );
}


export default getFirstTimeLoadoutAPICall;
