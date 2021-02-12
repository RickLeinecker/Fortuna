//@flow strict

import React, { useEffect, useState } from 'react';
import BlockBankTypeSelector from './BlockBankTypeSelector.js';
import BlockBankBlockShelf from './BlockBankBlockShelf.js';
import CasusBlock from '../blocks/CasusBlock.js';
import './BlockBank.css';

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

  const onSectionClicked = (section: BlockBankType) => {
    setSelectedSection(section);
  }

  /* ADD HELP MODAL */

  const showHelp = () => {
    console.log("help!");
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
      <button className="helpButton" onClick={() => showHelp()}>Help</button>
    </>
  );
}

export default BlockBank