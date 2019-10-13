import * as React from 'react';
import Popup from 'reactjs-popup';

class LoginPopup extends React.Component<{||}> {
  render(): React.Node {
    return(
	  <Popup
	    trigger={<button className="button">Open Modal</button>}
	    modal
	    closeOnDocumentClick
	  >
	    <span>Modal Content</span>
	  </Popup>
	);
  }
}

export default LoginPopup