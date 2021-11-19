import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footer/Footer.js';

export default function Signup({ location, history }) {
  React.useEffect(() => {
    document.body.classList.toggle('index-page');
    return function cleanup() {
      document.body.classList.toggle('index-page');
    };
  }, []);
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <IndexNavbar />
      <div className='wrapper'>
        <div className='main'>
          <div className='section section-signup'>
            <Container>
              <div className='squares square-1' />
              <div className='squares square-2' />
              <div className='squares square-3' />
              <div className='squares square-4' />
              <Row className='row-grid justify-content-between align-items-center'>
                <Col lg='6'>
                  <h3 className='display-3 text-white'>
                    Hybrid Scheduler <span className='text-white'></span>
                  </h3>
                  <p className='text-white mb-3'>
                    Hybrid classes work in such a manner that half-strength
                    would attend college/school and the same lecture would
                    simultaneously be made available online for those attending
                    lecture from their respective homes.
                  </p>
                  <div className='btn-wrapper'>
                    <Link to='/login'>
                      <Button color='primary'>Go to Login Page</Button>
                    </Link>
                  </div>
                </Col>
                <Col className='mb-lg-auto' lg='6'>
                  <Card className='card-register'>
                    <CardHeader>
                      <CardImg
                        alt='...'
                        src={require('assets/img/square-purple-1.png').default}
                      />
                      <CardTitle tag='p' style={{ marginLeft: '3px' }}>
                        Register
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className='form'>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': fullNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='tim-icons icon-single-02' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Full Name'
                            type='text'
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='tim-icons icon-email-85' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Email'
                            type='text'
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            'input-group-focus': passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='tim-icons icon-lock-circle' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Password'
                            type='text'
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={submitHandler}
                        className='btn-round'
                        color='primary'
                        size='lg'
                      >
                        Register
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
