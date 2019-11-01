//@flow strict

import * as React from 'react';

class CasusEditor extends React.Component<{||}> {

	render(): React.Node {
		const style = {
			backgroundColor: '#ffffaa',
			height: '500px',
			justifyContent: 'center',
			width: '100%'
		};

		return (
			<div style={style}>
				Casus Editor
			</div>
		);
	}

}

export default CasusEditor

