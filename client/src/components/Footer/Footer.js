import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';

export default function Footer() {
  return (
    <footer className='footer' style={{ padding: '10px 0' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; {new Date().getFullYear()}, Made with 💖 by Aradhna
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
