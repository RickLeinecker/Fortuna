//@flow strict

import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

//This is where we render the view for the login page
const rootComponent = document.getElementById('root');
if (rootComponent != null) {
	ReactDOM.render(<App />, rootComponent);
}
