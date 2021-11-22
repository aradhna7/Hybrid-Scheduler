import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

export default function Footer() {
  return (
    <footer className='footer' style={{ padding: '10px 0' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; {new Date().getFullYear()}, Made with 💖 by{' '}
            <a
              href='https://www.linkedin.com/in/aradhna7sharma/'
              target='_blank'
            >
              Aradhna
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
