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
    </>
  );
}

export default BlockBank
