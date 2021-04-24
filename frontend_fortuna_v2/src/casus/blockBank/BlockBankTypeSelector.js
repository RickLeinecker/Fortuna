//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlockBankTypeSelector.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-modal';
import Help from './Help';

import type {BlockBankType} from './BlockBankType.js';

type Props = {|
	onSectionClicked: (section: BlockBankType) => void
|};

class BlockBankTypeSelector extends React.Component<Props> {

  constructor()
  {
    super();

    this.state = {
      modalIsOpen: false
    }
  }

	showSection(section: BlockBankType):void {
		this.props.onSectionClicked(section);
  }

    /* ADD HELP MODAL */
  /* using react model
    inside of modal set a component that can change state as
    new help options are selected
  */
    openModal = () => {
      this.setState({ modalIsOpen: true });
      console.log("open");
    }
  
    closeModal = () => {
      this.setState({ modalIsOpen: false });
      console.log("closed")
    }
  
    customStyles = {
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



	render():React.Node {

		//sections:
		//	- Control Flow (if / if-else / loops)
		//	- Variables (Set __ to / Get variables)
		//	- Math (angleTo, abs, +, -, *, /)
		//	- Logic (and / or / xor)
		//	- Lists
		return (
      <>
        <Container className="blockTypeSelect" fluid>
          <Row>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('CONTROL_FLOW')}>Control Flow</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('VARIABLES')}>Variables and Constants</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('MATH')}>Math</Button></Col>
          </Row>
          <Row>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('DOUBLES')}>Double Operations</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('LOGIC')}>Logic</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('INTS')}>Integer Operations</Button></Col>
          </Row>
          <Row>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('LISTS')}>Lists</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('DEBUG')}>Debug</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.openModal()}>Help</Button></Col>
          </Row>
        </Container>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={this.customStyles}
          contentLabel="Help Modal"
        >
          <Help />
          <Button className="helpButton parent" onClick={() => this.closeModal()}>Close</Button>
        </Modal>
      </>


		);
	}

}

export default BlockBankTypeSelector;
