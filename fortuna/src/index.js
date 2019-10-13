//@flow strict

import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

// Renders the page.
const rootComponent = document.getElementById('root');
if (rootComponent != null) {
	ReactDOM.render(<App />, rootComponent);
}
