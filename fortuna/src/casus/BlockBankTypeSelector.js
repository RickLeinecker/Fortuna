//@flow strict

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class BlockBankTypeSelector extends React.Component<{||}> {

	render():React.Node {
		const style = {
			backgroundColor: '#111111',
			height: '100%',
			width: '200px'
		}
		return (
			<div style={style}>
				<button className="button">Tab 1</button>
				<button>Tab 2</button>
				<button>Tab 3</button>
				<button>Tab 4</button>
			</div>
		);
	}

}

export default BlockBankTypeSelector;
