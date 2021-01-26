//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlockBankTypeSelector.css';
import { Container, Row, Col, Button } from 'react-bootstrap'

import type {BlockBankType} from './BlockBankType.js';

type Props = {|
	onSectionClicked: (section: BlockBankType) => void
|};

class BlockBankTypeSelector extends React.Component<Props> {

	showSection(section: BlockBankType):void {
		this.props.onSectionClicked(section);
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
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('VARIABLES')}>Variables</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('MATH')}>Math</Button></Col>
          </Row>
          <Row>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('DOUBLES')}>Doubles</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('LOGIC')}>Logic</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('INTS')}>Integers</Button></Col>
          </Row>
          <Row>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('LISTS')}>Lists</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => this.showSection('DEBUG')}>Debug</Button></Col>
            <Col md={4}><Button className="spacing" onClick={() => console.log("help goes here")}>Help</Button></Col>
          </Row>
        </Container>
      </>


		);
	}

}

export default BlockBankTypeSelector;
