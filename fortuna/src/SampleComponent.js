//@flow strict

import * as React from 'react';

class SampleComponent extends React.Component<{||}> {

	render(): React.Node {
		return (<div>This is how you make a component in a different file</div>);
	}

}

export default SampleComponent;
