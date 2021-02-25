//@flow strict

import getLoginToken from '../getLoginToken.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//sets the users first time value to true if page hasnt been visited
function setFirstTimeAPICall(onLoad:(firstTime: boolean) => void) {
    const token=getLoginToken();
    console.log('checking if this is the first time the user has visited this site...');
    const responsePromise: Promise<Response> = fetch('/api/user/setFirstTime', {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'x-auth-token': token
        },
        body: JSON.stringify(
            {
              firstTime: false
            })
    });
    responsePromise.then(
        response => response.json().then(data => {
            console.log("DATA: ", data)
            if (response.status !== 200) {
                console.log(response.status);
                console.log(data);
                toast.error(getErrorFromObject(data));
                console.log('failure ');

            }
            else {

                const firstTimeStatus = data.firstTime

                console.log('set first time status: ');
                console.log(firstTimeStatus);
                console.log('success ');

            }
        })
    );
}


export default setFirstTimeAPICall;
