import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from 'firebase';
import { Progress } from 'reactstrap';
import { bookSlot } from '../actions/slotActions';
import { updateUserProfile, getUserDetails } from '../actions/userActions';

const Booking = ({ match, history }) => {
  const dispatch = useDispatch();
  const bookingSlotState = useSelector((state) => state.bookingSlot);

  const { error, data } = bookingSlotState;
  const [redirectToRef, setRedirectToRef] = useState(false);

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (data) {
      //
      setRedirectToRef(true);
      alert('SLOT SUCCESSFULLY BOOKED');
    }
  }, [error, data]);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userdetails = useSelector((state) => state.userDetails);
  const {
    user: { name, email, vaccination_certi },
  } = userdetails;
  const user = userInfo && userInfo._id;

  useEffect(() => {
    if (vaccination_certi !== '') {
      setUrl(vaccination_certi);
    }
  }, [vaccination_certi]);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserDetails('profile'));
    }
  }, [history, userInfo, user]);

  const handlechange = (e) => {
    if (e.target.files[0] != null) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const submitDetails = (e) => {
    e.preventDefault();
    if (url === '') {
      alert('Please upload vaccination certificate');
    } else {
      dispatch(bookSlot(user, url, match.params.date));
      dispatch(
        updateUserProfile({
          _id: userInfo._id,
          name,
          email,
          vaccination_certi: url,
        })
      );
    }
  };

  const clicktoshow = () => {
    window.open(url);
  };

  return (
    <div className='section section-examples' data-background-color='black'>
      {redirectToRef && <Redirect to='/myslots' />}
      <img
        alt='...'
        className='path'
        src={require('assets/img/path1.png').default}
      />
      <div className='space-50' />

      <Container>
        <h1 className='text-center' style={{ marginBottom: '90px' }}>
          Book slot for {match.params.date}
        </h1>

        <h3>Upload Vaccination Certificate</h3>

        {url ? (
          <Row className='mb-3'>
            <Col sm='6' className='mb-3'>
              <small style={{ textAlign: 'left' }}>{url}</small>
            </Col>
            <Col sm='6' className='mb-3'>
              <Button onClick={clicktoshow}>Open</Button>
            </Col>
            <Col sm='12' className='mb-4 mt-4'>
              <h4>Update vaccination Certificate(if you want)</h4>
            </Col>
            <Col sm='6' className='mb-3'>
              {' '}
              <input
                className='mb-4'
                type='file'
                onChange={handlechange}
                required
              />
              <Button
                className='btn-round'
                color='warning'
                size='sm'
                onClick={handleUpload}
              >
                Re-Upload
              </Button>
            </Col>
            <br />
            <Col sm='6' className='mb-3'>
              <Progress value={progress} style={{ width: '50%' }} />{' '}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col sm='6' className='mb-3'>
              {' '}
              <input
                className='mb-4'
                type='file'
                onChange={handlechange}
                required
              />
              <Button
                className='btn-round'
                color='warning'
                size='sm'
                onClick={handleUpload}
              >
                Upload
              </Button>
              <small style={{ textAlign: 'left' }}>{url}</small>
            </Col>
            <br />
            <Col sm='6' className='mb-3'>
              <Progress value={progress} style={{ width: '50%' }} />{' '}
            </Col>
          </Row>
        )}

        <Row className='mt-4'>
          <Col sm='6'>
            <h3>Date selected for attending offline classes:</h3>
          </Col>
          <Col sm='6'>
            <p className='mt-2'>{match.params.date}</p>
          </Col>
        </Row>
        <br />
        <Button
          className='btn-round'
          color='primary'
          size='lg'
          onClick={submitDetails}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default Booking;
