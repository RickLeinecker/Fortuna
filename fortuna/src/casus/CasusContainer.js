//@flow strict

import * as React from 'react';
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';
import './CasusContainer.css';

class CasusContainer extends React.Component<{||}> {

	render(): React.Node {
		return (
			<div className="casusContainerDiv">
				<BlockBank />
				<CasusEditor />
			</div>
		);
	}
}

export default CasusContainer;
