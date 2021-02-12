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

  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      backgroundColor: "#012074",
      borderStyle: "solid"
    }
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
        style={customStyles}
        contentLabel="Help Modal"
      >
        <Help />
        <Button className="helpButton parent" onClick={closeModal}>Close</Button>
      </Modal>
    </>
  );
}

export default BlockBank
