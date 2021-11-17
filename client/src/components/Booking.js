import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from 'firebase';
import { Progress } from 'reactstrap';
import { bookSlot, updateSlotByDate } from '../actions/slotActions';

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
      alert('SLOT SUCCESSFULLY BOOKED');
    }
  }, [error, data]);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo._id;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo, user]);

  const handlechange = (e) => {
    if (e.target.files[0] != null) {
      setImage(e.target.files[0]);
    }
  };

  console.log(image);

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

  const updateSlot = () => {
    if (data) {
      dispatch(updateSlotByDate(match.params.date));
    }
  };

  const submitDetails = (e) => {
    e.preventDefault();
    dispatch(bookSlot(user, url, match.params.date));
    dispatch(updateSlotByDate(match.params.date));
    updateSlot();
  };

  return (
    <div className='section section-examples' data-background-color='black'>
      {redirectToRef && <Redirect to='/calender' />}
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
        <Row>
          <Col sm='12'>
            <h3>Upload Vaccination Certificate</h3>
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
              Upload
            </Button>
            <small style={{ textAlign: 'left' }}>{url}</small>
          </Col>
          <br />
          <Col sm='6' className='mb-3'>
            <Progress value={progress} style={{ width: '50%' }} />{' '}
          </Col>
        </Row>

        <Row>
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
