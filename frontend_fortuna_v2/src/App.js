//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Login from './login/Login.js';

// App class builds the front page.
class App extends React.Component<{||}> {
	
	render(): React.Node {
		return (
      <>
			  <Login />
        <div class="footer">
          <p>Photo credit: <a href="https://www.artstation.com/artwork/GXwZgz">ArtStation</a></p>
        </div>
      </>
		);
	}
}

export default App;