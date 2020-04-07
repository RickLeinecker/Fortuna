//@flow strict

import * as React from 'react';

import './DebugLog.css';

type Props = {|
	debugLines: Array<string>,
|};

class DebugLog extends React.Component<Props> {

	render(): React.Node {
		return (
			<div className='debugLog'>
				{this.props.debugLines.map((text, index) =>
					<div key={index}>
						{text}
					</div>
				)}
			</div>
		);
	}
}

export default DebugLog;
