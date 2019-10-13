//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.js';

// This builds the page.
class App extends React.Component<{||}> {
  
  render(): React.Node {
    return (
      <Login/>
    );
  }
}

export default App;