//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.js';

//This is the Login Page Display
class App extends React.Component<{||}> {
  
  render(): React.Node {
    return (
      <div id="Parent">
        <Login/>
      </div>
    );
  }
}

export default App;