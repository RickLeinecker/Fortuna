//@flow strict

import * as React from 'react';
import BlockBank from './BlockBank.js';
import CasusEditor from './CasusEditor.js';

class CasusContainer extends React.Component<{||}> {

	render(): React.Node {
		const containerStyle = {
			padding: 20,
			margin: 20
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
