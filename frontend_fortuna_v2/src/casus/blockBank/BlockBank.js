//@flow strict

import React, { useEffect, useState } from 'react';
import BlockBankTypeSelector from './BlockBankTypeSelector.js';
import BlockBankBlockShelf from './BlockBankBlockShelf.js';
import CasusBlock from '../blocks/CasusBlock.js';
import Help from './Help';
import './BlockBank.css';
import Modal from 'react-modal';

import type {BlockBankType} from './BlockBankType.js';

import { Button, Container, Row, Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'

type Props = {|
	draggedBlocks: ?Array<CasusBlock>,
	onBlocksDragged: (Array<CasusBlock>) => void,
	onDraggedBlocksReleased: () => void
|};

function BlockBank(props) {

  const [selectedSection, setSelectedSection] = useState('CONTROL_FLOW');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('body');
  })


  const onSectionClicked = (section: BlockBankType) => {
    setSelectedSection(section);
  }

  /* ADD HELP MODAL */
  /* using react model
    inside of modal set a component that can change state as
    new help options are selected
  */
  const openModal = () => {
    setModalIsOpen(true);
    console.log("open");
  }

  const closeModal = () => {
    setModalIsOpen(false);
    console.log("closed")
  }

  return (
    <>
      <div className="stickyPosition"> 
        <div>
          <BlockBankTypeSelector onSectionClicked={onSectionClicked} />
        </div>
        <div className="flexRight blockShelf">
          <BlockBankBlockShelf
            selectedSection={selectedSection} 
            {...props}
          />
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <button className="helpButton" onClick={openModal}>Help</button>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Help Modal"
      >
        <Help />
        <button className="helpButton" onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

export default BlockBank



// type State = {|
// 	selectedSection: BlockBankType	
// |};

// class BlockBank extends React.Component<Props, State> {

// 	constructor(props: Props) {
// 		super(props);
// 		this.state = {selectedSection: 'CONTROL_FLOW'};
// 	}

// 	onSectionClicked = (section: BlockBankType) => {
// 		this.setState({selectedSection: section});
// 	}

//   showHelp() {
//     console.log("Help!")
//   }

// 	render(): React.Node {
// 		return (
//       <>
//       	<div className="stickyPosition"> 
//           <div>
//             <BlockBankTypeSelector onSectionClicked={this.onSectionClicked} />
//           </div>
//           <div className="flexRight blockShelf">
//             <BlockBankBlockShelf
//               selectedSection={this.state.selectedSection} 
//               {...this.props}
//             />
//           </div>
//         </div>
//         <br/>
//         <br/>
//         <br/>
//         <button className="helpButton" onClick={() => this.showHelp()}>Help</button>
//       </>
// 		);
// 	}

// }

// export default BlockBank;
