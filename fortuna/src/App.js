//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.js'

//This is the Login Page Display
class App extends React.Component<{||}> {
  
  render(): React.Node {
    return (
      <Login/>
    );
  }
}

export default App;