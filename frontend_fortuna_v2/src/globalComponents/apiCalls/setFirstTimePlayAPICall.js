//@flow strict

import getLoginToken from '../getLoginToken.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//sets the users first time value to false if page hasnt been visited

function setFirstTimePlayAPICall(onLoad:(firstTimePlay: boolean) => void) {
    const token=getLoginToken();
    console.log('changing firstTimePlay to false...');
    const responsePromise: Promise<Response> = fetch('/api/user/setFirstTimePlay', {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'x-auth-token': token
        },
        body: JSON.stringify(
            {
                firstTimePlay: false
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



                console.log('set first time status for Play page: ');

                console.log('success ');

            }
        })
    );
}

export default setFirstTimePlayAPICall;
