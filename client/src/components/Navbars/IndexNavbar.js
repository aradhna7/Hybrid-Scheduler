import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';
import { logout } from '../../actions/userActions';

export default function IndexNavbar() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    return <Redirect to='/login' />;
  };

  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState('');
  const [color, setColor] = React.useState('navbar-transparent');
  React.useEffect(() => {
    window.addEventListener('scroll', changeColor);
    return function cleanup() {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor('bg-default');
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor('navbar-transparent');
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle('nav-open');
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut('collapsing-out');
  };
  const onCollapseExited = () => {
    setCollapseOut('');
  };

  return (
    <Navbar className={'fixed-top ' + color} color-on-scroll='100' expand='lg'>
      <Container>
        <div className='navbar-translate'>
          <NavbarBrand to='/' tag={Link} id='navbar-brand'>
            <span>Hybrid Scheduler </span>
          </NavbarBrand>
          <UncontrolledTooltip placement='bottom' target='navbar-brand'>
            Made with love ❤ by Aradhna
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className='navbar-toggler navbar-toggler'
            onClick={toggleCollapse}
          >
            <span className='navbar-toggler-bar bar1' />
            <span className='navbar-toggler-bar bar2' />
            <span className='navbar-toggler-bar bar3' />
          </button>
        </div>
        <Collapse
          className={'justify-content-end ' + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className='navbar-collapse-header'>
            <Row>
              <Col className='collapse-brand' xs='8'>
                <a href='#pablo' onClick={(e) => e.preventDefault()}>
                  Hybrid Scheduler
                </a>
              </Col>
              <Col className='collapse-close text-right' xs='4'>
                <button
                  aria-expanded={collapseOpen}
                  className='navbar-toggler'
                  onClick={toggleCollapse}
                >
                  <i className='tim-icons icon-simple-remove' />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            {!userInfo && (
              <NavItem>
                <Link to='/register'>
                  <Button
                    className='nav-link d-sm-block'
                    color='default'
                    style={{ padding: '10px', marginBottom: '10px' }}
                  >
                    Signup
                  </Button>
                </Link>
              </NavItem>
            )}

            {!userInfo && (
              <NavItem>
                <Link to='/login'>
                  <Button
                    className='nav-link d-sm-block'
                    style={{ padding: '10px', marginBottom: '10px' }}
                    color='default'
                  >
                    Signin
                  </Button>
                </Link>
              </NavItem>
            )}
            {userInfo && (
              <NavItem>
                <Button
                  className='nav-link d-sm-block'
                  style={{ padding: '10px', marginBottom: '10px' }}
                  color='success'
                >
                  Hi, {userInfo.name}
                </Button>
              </NavItem>
            )}

            {userInfo && userInfo.isTeacher && (
              <NavItem>
                <Button
                  className='nav-link d-sm-block'
                  style={{ padding: '10px', marginBottom: '10px' }}
                  color='default'
                  href='/getnumslots'
                >
                  Get list
                </Button>
              </NavItem>
            )}

            {userInfo && userInfo.isTeacher && (
              <NavItem>
                <Button
                  className='nav-link d-sm-block'
                  style={{ backgroundColor: 'transparent' }}
                  style={{ padding: '10px', marginBottom: '10px' }}
                  href='/setnumslots'
                >
                  Create Slots
                </Button>
              </NavItem>
            )}

            {userInfo && (
              <NavItem>
                <Button
                  className='nav-link d-sm-block'
                  style={{ padding: '10px', marginBottom: '10px' }}
                  color='default'
                  href='/myslots'
                >
                  My Slots
                </Button>
              </NavItem>
            )}

            {userInfo && (
              <NavItem>
                <Button
                  className='nav-link d-sm-block'
                  style={{ padding: '10px', marginBottom: '10px' }}
                  color='default'
                  href='/calender'
                >
                  Calender
                </Button>
              </NavItem>
            )}

            {userInfo && (
              <NavItem>
                <Button
                  className='nav-link d-sm-block'
                  style={{ padding: '10px', marginBottom: '10px' }}
                  color='default'
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
