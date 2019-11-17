//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import BlockBank from './BlockBank.js';
import CasusEditor from './CasusEditor.js';

class Casus extends React.Component<{||}> {

	render(): React.Node {
		const containerStyle = {
			padding: 20,
			margin: 20
		};

		return (
		    <div id = "Parent">
			  <div class = "col-md-4">
                <Link to="/MainMenu">
                  <button type="button" class="btn btn-secondary btn-lg">&lt;- Back to Main Menu</button>
                </Link>
              </div>
			  <div style={containerStyle}>
				  <BlockBank />
				  <CasusEditor />
			  </div>
			</div>
		);
	}
}

export default Casus;
