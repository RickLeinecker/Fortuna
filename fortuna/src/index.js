//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import LoginPageDisplay from './Login.js'
import CasusContainer from './casus/CasusContainer.js';

//This is where we render the view for the login page
const rootComponent=document.getElementById('root');
if (rootComponent != null) {
	ReactDOM.render(<LoginPageDisplay />, rootComponent);
}

