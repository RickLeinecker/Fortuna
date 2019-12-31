//@flow strict

import * as React from 'react';
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';

class CasusContainer extends React.Component<{||}> {

	render(): React.Node {
		const containerStyle = {
			padding: 20,
			backgroundColor: '#00ff00'
		};

		return (
			<div style={containerStyle}>
				<BlockBank />
				<CasusEditor />
			</div>
		);
	}
}

export default CasusContainer;
